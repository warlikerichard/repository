import { NextRequest, NextResponse } from "next/server";
import { userData } from "@/lib/data/userData";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY ?? process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Chave da API Gemini não configurada. Adicione GEMINI_API_KEY no arquivo .env.local",
        },
        { status: 500 }
      );
    }

    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensagem inválida" },
        { status: 400 }
      );
    }

    const systemContext = `
      Você é um assistente útil e profissional para o portfólio de Warlike R. S. Soares.
      Responda perguntas estritamente baseadas nestes dados: ${JSON.stringify(userData)}.
      Se a pergunta for sobre algo não listado, diga que não tem essa informação mas sugere entrar em contato pelo email.
      Mantenha um tom técnico, mas amigável. Responda em português.
      O usuário está interessado em contratar ou saber mais sobre Warlike.
      Use formatação Markdown quando apropriado: **negrito**, listas, \`código\` para tecnologias, etc.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: systemContext + "\n\nPergunta do usuário: " + message,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 350,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error?.message ?? "Erro ao conectar com a API";
      return NextResponse.json(
        { error: errorMsg },
        { status: response.status }
      );
    }

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    // Extrair texto da resposta - suporta estrutura com múltiplos parts (ex: thinking models)
    const candidate = data.candidates?.[0];
    if (!candidate) {
      return NextResponse.json(
        { error: "Resposta vazia do modelo. Tente novamente." },
        { status: 500 }
      );
    }

    const parts = candidate.content?.parts ?? [];
    const textPart = parts.find((p: { text?: string }) => p.text);
    const text = textPart?.text ?? parts.map((p: { text?: string }) => p.text).filter(Boolean).join("");

    if (!text) {
      const blockReason = candidate.finishReason ?? "unknown";
      return NextResponse.json(
        {
          error:
            blockReason === "SAFETY"
              ? "A resposta foi bloqueada por filtros de segurança."
              : "Não foi possível obter resposta. Tente reformular sua pergunta.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Erro API Chat:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
