/**
 * Filtro de seguridad para tareas del agente.
 * Bloquea instrucciones destructivas o de alto riesgo antes de encolarlas.
 */

const BLOCKED_PATTERNS = [
    {
        pattern: /\b(borrar|eliminar|destruir|wipe|drop|truncate)\b.*\b(base de datos|database|bd|db|tabla|table|schema|postgres|sql)\b/i,
        reason: "No se permiten tareas que borren o destruyan la base de datos o tablas.",
    },
    {
        pattern: /\b(drop\s+database|drop\s+schema|truncate\s+table|delete\s+from\s+\w+\s*(;|$|\bwhere\b\s*1\s*=\s*1))/i,
        reason: "Instrucción SQL destructiva detectada.",
    },
    {
        pattern: /\brm\s+-rf\b/i,
        reason: "Comando destructivo del sistema detectado.",
    },
    {
        pattern: /\b(borrar|eliminar|delete)\b.*\b(todos|all|every)\b.*\b(usuarios|users|negocios|businesses|datos|records|registros)\b/i,
        reason: "No se permiten borrados masivos de datos de producción.",
    },
    {
        pattern: /\b(exponer|publicar|leak|compartir|enviar)\b.*\b(secrets?|secretos|\.env|api[_-]?keys?|passwords?|tokens?|credenciales)\b/i,
        reason: "No se permiten tareas que expongan secretos o credenciales.",
    },
    {
        pattern: /\b(desactivar|disable|eliminar|remove|bypass)\b.*\b(auth|autenticaci[oó]n|login|seguridad|security|cors|middleware)\b/i,
        reason: "No se permiten tareas que desactiven controles de seguridad.",
    },
    {
        pattern: /\b(git\s+push\s+--force|force\s+push|hard\s+reset|reset\s+--hard)\b/i,
        reason: "Operaciones git destructivas no permitidas vía cola de tareas.",
    },
    {
        pattern: /\b(hackear|hack|exploit|sql\s*injection|xss|backdoor|malware|ransomware)\b/i,
        reason: "Contenido de ataque o explotación detectado.",
    },
    {
        pattern: /\b(acceder|access)\b.*\b(cuenta ajena|otro usuario|without auth|sin auth)\b/i,
        reason: "Acceso no autorizado a recursos de terceros.",
    },
];

export function validateAgentTaskSafety(title, description) {
    const text = `${title ?? ""}\n${description ?? ""}`.trim();
    if (!text) {
        return {
            allowed: false,
            safetyStatus: "BLOCKED",
            reason: "La tarea debe tener título o descripción.",
        };
    }

    for (const rule of BLOCKED_PATTERNS) {
        if (rule.pattern.test(text)) {
            return {
                allowed: false,
                safetyStatus: "BLOCKED",
                reason: rule.reason,
            };
        }
    }

    return {
        allowed: true,
        safetyStatus: "APPROVED",
        reason: null,
    };
}

export function getAgentTaskSafetyRulesForDisplay() {
    return [
        "No borrar ni truncar la base de datos",
        "No eliminar masivamente usuarios, negocios o datos",
        "No exponer secretos (.env, API keys, contraseñas)",
        "No desactivar autenticación ni seguridad",
        "No comandos destructivos (rm -rf, git push --force)",
    ];
}
