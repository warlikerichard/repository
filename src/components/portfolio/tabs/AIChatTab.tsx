"use client";

import { Bot, MessageSquare } from "lucide-react";
import { AIChat } from "../AIChat";

const SUGGESTED_QUESTIONS = [
  "Quais suas principais habilidades?",
  "Fale sobre sua experiência na Teleperformance.",
  "O que você estudou na UFRN?",
  "Você trabalha com Inteligência Artificial?",
];

export function AIChatTab() {
  const handleCopyQuestion = (question: string) => {
    navigator.clipboard.writeText(question);
    alert("Pergunta copiada! Cole no chat.");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Bot className="text-green-400" /> Entrevista Virtual
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <AIChat />
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="font-bold text-white mb-3">Sugestões de Perguntas:</h3>
            <ul className="space-y-3">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="text-left text-sm text-slate-400 hover:text-green-400 hover:bg-slate-800 p-2 rounded w-full transition-colors flex items-center gap-2"
                    onClick={() => handleCopyQuestion(q)}
                  >
                    <MessageSquare size={14} /> {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-900/50">
            <p className="text-sm text-blue-200">
              Esta IA foi treinada com o contexto do meu currículo atualizado.
              Sinta-se à livre para perguntar detalhes técnicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
