/**
 * Importa prospectos desde un archivo Excel (.xlsx), todas las hojas.
 *
 * Uso:
 *   node scripts/importProspectsFromXlsx.js "../data bases/archivo.xlsx"
 */
import { spawnSync } from "child_process";
import path from "path";
import { existsSync } from "fs";
import dotenv from "dotenv";
import { bulkImportEmailProspects } from "../services/emailProspect/emailProspectImportService.js";

dotenv.config();

const PYTHON_PARSER = `
import json, sys, openpyxl

path = sys.argv[1]

def find_col(header, names):
    for i, h in enumerate(header):
        if h is None:
            continue
        hnorm = str(h).strip().lower()
        for n in names:
            if hnorm == n.lower():
                return i
    return None

def cell(row, i):
    if i is None or i >= len(row) or row[i] is None:
        return ""
    return str(row[i]).strip()

wb = openpyxl.load_workbook(path, read_only=True)
records = []

for sheet_name in wb.sheetnames:
    ws = wb[sheet_name]
    rows = list(ws.iter_rows(values_only=True))
    if not rows:
        continue
    header = rows[0]
    email_idx = find_col(header, ["email"])
    if email_idx is None:
        continue
    name_idx = find_col(header, ["name", "nombrescontacto", "nombrecontacto", "nombrerepresentantelegal"])
    surname_idx = find_col(header, ["surname", "apellidoscontacto", "apellidopaternorepresentantelegal"])
    company_idx = find_col(header, ["company", "nombrefantasia", "razonsocial"])

    for row in rows[1:]:
        if not row or all(c is None for c in row):
            continue
        email = cell(row, email_idx).lower()
        if not email or "@" not in email:
            continue
        parts = []
        if name_idx is not None:
            parts.append(cell(row, name_idx))
        if surname_idx is not None:
            parts.append(cell(row, surname_idx))
        first = " ".join(p for p in parts if p).strip() or None
        company = cell(row, company_idx) or None
        records.append({
            "email": email,
            "firstName": first,
            "companyName": company,
        })

print(json.dumps(records))
`;

function parseXlsxWithPython(filePath) {
    const result = spawnSync("python3", ["-c", PYTHON_PARSER, filePath], {
        encoding: "utf8",
        maxBuffer: 50 * 1024 * 1024,
    });
    if (result.error) {
        throw result.error;
    }
    if (result.status !== 0) {
        throw new Error(result.stderr || "No se pudo leer el Excel (¿openpyxl instalado?)");
    }
    return JSON.parse(result.stdout.trim());
}

function sourceLabelFromPath(filePath) {
    const base = path.basename(filePath, path.extname(filePath));
    return `import_xlsx_${base.replace(/\s+/g, "-").slice(0, 80)}`;
}

async function main() {
    const inputPath = process.argv[2] ?? "../data bases/database-actualizada.xlsx";
    const filePath = path.resolve(process.cwd(), inputPath);

    if (!existsSync(filePath)) {
        throw new Error(`Archivo no encontrado: ${filePath}`);
    }

    const BATCH_SIZE = 2000;
    const source = sourceLabelFromPath(filePath);

    console.info(`Leyendo (todas las hojas): ${filePath}`);
    const rows = parseXlsxWithPython(filePath);
    console.info(`Registros con email: ${rows.length}`);

    const totals = {
        totalRows: 0,
        created: 0,
        skipped: 0,
        breakdown: {
            invalidEmail: 0,
            duplicateInFile: 0,
            alreadyProspect: 0,
            alreadyRegisteredUser: 0,
            alreadyUnsubscribed: 0,
            alreadyConverted: 0,
        },
        errors: [],
    };

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(rows.length / BATCH_SIZE);
        console.info(`Lote ${batchNum}/${totalBatches} (${batch.length} registros)...`);

        const report = await bulkImportEmailProspects({ rows: batch }, { source });

        totals.totalRows += report.totalRows;
        totals.created += report.created;
        totals.skipped += report.skipped;
        if (report.breakdown) {
            for (const [key, val] of Object.entries(report.breakdown)) {
                totals.breakdown[key] = (totals.breakdown[key] ?? 0) + val;
            }
        }
        if (report.errors?.length) {
            totals.errors.push(...report.errors.slice(0, 5));
        }
        console.info(`  → cargados ${report.created}, omitidos ${report.skipped}`);
    }

    console.info("\n── Reporte de importación ──");
    console.info(`Procesados: ${totals.totalRows}`);
    console.info(`Cargados:   ${totals.created}`);
    console.info(`Omitidos:   ${totals.skipped}`);
    console.info("Desglose:", totals.breakdown);
    if (totals.errors.length) {
        console.info(`Muestras de omitidos (${totals.errors.length}):`);
        totals.errors.slice(0, 15).forEach((e) => console.info(`  · ${e.email}: ${e.message}`));
    }
}

main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
});
