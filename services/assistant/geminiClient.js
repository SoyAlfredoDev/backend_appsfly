const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const GEMINI_BASE =
    "https://generativelanguage.googleapis.com/v1beta/models";

function getApiKey() {
    return process.env.GEMINI_API_KEY?.trim() || null;
}

export function isGeminiConfigured() {
    return Boolean(getApiKey());
}

/**
 * @param {object} payload - cuerpo de generateContent
 */
async function callGemini(payload) {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("GEMINI_NOT_CONFIGURED");
    }

    const url = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        const message =
            data?.error?.message ||
            `Gemini respondió con estado ${response.status}`;
        const err = new Error(message);
        err.status = response.status;
        throw err;
    }

    return data;
}

function extractParts(candidate) {
    return candidate?.content?.parts ?? [];
}

function extractText(parts) {
    return parts
        .filter((p) => typeof p.text === "string")
        .map((p) => p.text)
        .join("")
        .trim();
}

function extractFunctionCalls(parts) {
    return parts
        .filter((p) => p.functionCall?.name)
        .map((p) => ({
            name: p.functionCall.name,
            args: p.functionCall.args ?? {},
        }));
}

/**
 * @param {Array<{ role: string, parts: object[] }>} contents
 * @param {object[]} functionDeclarations
 * @param {{ parts: { text: string }[] }} systemInstruction
 */
export async function generateWithTools(
    contents,
    functionDeclarations,
    systemInstruction,
) {
    const data = await callGemini({
        systemInstruction,
        contents,
        tools: [{ functionDeclarations }],
        toolConfig: {
            functionCallingConfig: { mode: "AUTO" },
        },
        generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
        },
    });

    const candidate = data.candidates?.[0];
    const parts = extractParts(candidate);

    return {
        text: extractText(parts),
        functionCalls: extractFunctionCalls(parts),
        raw: data,
    };
}

export function buildSystemInstruction(businessName) {
    const name = businessName?.trim() || "tu negocio";
    return `Eres el asistente virtual de AppsFly para el negocio "${name}".

REGLAS ESTRICTAS:
- Solo puedes ayudar con datos y operaciones de ESTE negocio.
- NUNCA inventes datos: usa siempre las herramientas disponibles.
- No puedes crear, editar ni eliminar registros (solo consultas y reportes).
- No tienes acceso a otros negocios ni a datos de la plataforma AppsFly.
- Responde siempre en español, de forma clara y concisa.
- Si no tienes una herramienta para algo, indícalo y sugiere ir a la sección correspondiente de AppsFly.
- Para montos en pesos chilenos, formatea con separador de miles cuando sea útil.
- Fecha actual de referencia: ${new Date().toISOString().slice(0, 10)}.`;
}

export function toGeminiContents(systemInstruction, messages) {
    const contents = [];

    for (const msg of messages) {
        const role = msg.role === "assistant" ? "model" : "user";
        if (!msg.content?.trim()) continue;
        contents.push({
            role,
            parts: [{ text: msg.content.trim() }],
        });
    }

    return {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
    };
}

export function appendFunctionResponse(contents, name, response) {
    contents.push({
        role: "user",
        parts: [
            {
                functionResponse: {
                    name,
                    response: { result: response },
                },
            },
        ],
    });
}

export function appendModelFunctionCalls(contents, functionCalls) {
    contents.push({
        role: "model",
        parts: functionCalls.map((fc) => ({
            functionCall: { name: fc.name, args: fc.args },
        })),
    });
}
