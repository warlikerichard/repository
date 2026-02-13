"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, Send, Loader2 } from "lucide-react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold text-white">{children}</strong>,
  em: ({ children }: { children?: React.ReactNode }) => <em className="italic text-slate-300">{children}</em>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li className="text-slate-300">{children}</li>,
  code: ({ className, children, ...props }: { className?: string; children?: React.ReactNode }) => {
    const isInline = !className;
    return isInline ? (
      <code className="px-1.5 py-0.5 rounded bg-slate-800 text-green-300 text-xs font-mono border border-slate-600" {...props}>
        {children}
      </code>
    ) : (
      <code className={`block p-3 rounded-lg bg-slate-950 text-green-300 text-xs font-mono border border-slate-700 overflow-x-auto ${className ?? ""}`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => <pre className="mb-2 overflow-x-auto">{children}</pre>,
  h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-lg font-bold text-white mb-1 mt-2 first:mt-0">{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-base font-bold text-white mb-1 mt-2 first:mt-0">{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-sm font-bold text-slate-100 mb-1 mt-2 first:mt-0">{children}</h3>,
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-green-500 pl-3 my-2 text-slate-400 italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 underline">
      {children}
    </a>
  ),
};

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao processar sua pergunta.");
      }

      const aiResponse = data.text ?? "Desculpe, não consegui processar sua pergunta agora.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Erro AI:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro de conexão com a IA. Por favor, tente novamente mais tarde.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
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
                  : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none [&>div]:break-words"
              }`}
            >
              {msg.role === "user" ? (
                msg.content
              ) : (
                <div className="[&_*]:break-words">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}
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
