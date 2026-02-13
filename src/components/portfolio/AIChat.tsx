"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Send, Loader2 } from "lucide-react";
import { userData } from "@/lib/data/userData";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "Olá! Eu sou o assistente virtual do portfólio do Warlike. Posso responder perguntas sobre a experiência dele com React, histórico profissional ou formação acadêmica. O que gostaria de saber?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
      const systemContext = `
        Você é um assistente útil e profissional para o portfólio de Warlike R. S. Soares.
        Responda perguntas estritamente baseadas nestes dados: ${JSON.stringify(userData)}.
        Se a pergunta for sobre algo não listado, diga que não tem essa informação mas sugere entrar em contato pelo email.
        Mantenha um tom técnico, mas amigável. Responda em português.
        O usuário está interessado em contratar ou saber mais sobre Warlike.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: systemContext + "\n\nPergunta do usuário: " + userMsg }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 250,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Desculpe, não consegui processar sua pergunta agora.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Erro AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Erro de conexão com a IA. Por favor, tente novamente mais tarde.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[600px] flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
          <Bot size={24} className="text-green-400" />
        </div>
        <div>
          <h3 className="text-white font-bold">Warlike AI Assistant</h3>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
            Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-lg rounded-bl-none border border-slate-700">
              <Loader2 size={16} className="animate-spin text-green-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre minhas habilidades..."
          className="flex-1 bg-slate-950 border border-slate-600 rounded p-2 text-white focus:border-green-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="bg-green-600 hover:bg-green-500 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
