"use client";

import { Code, Mail, ChevronRight, Briefcase, GraduationCap, Trophy } from "lucide-react";
import { userData } from "@/lib/data/userData";
import type { TabId } from "../types";

interface ProfileTabProps {
  setActiveTab: (tab: TabId) => void;
}

export function ProfileTab({ setActiveTab }: ProfileTabProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Code size={120} />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Olá, eu sou{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            {userData.name}
          </span>
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-8 border-l-4 border-green-500 pl-6">
          {userData.bio}
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className="cursor-pointer bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded font-bold transition-all shadow-lg shadow-green-900/20 flex items-center gap-2 hover:-translate-y-1"
          >
            <Mail size={18} /> Contatar Agora
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3 rounded font-bold transition-all flex items-center gap-2 hover:-translate-y-1"
          >
            Ver Portfólio <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Experience Section */}
        <section>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Briefcase className="text-green-400" /> Experiência Profissional
          </h3>
          <div className="space-y-6">
            {userData.experience.map((exp, i) => (
              <div
                key={i}
                className="relative pl-8 border-l border-slate-800 hover:border-green-500/50 transition-colors"
              >
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-slate-800 border border-green-500 rounded-full" />
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors">
                  <h4 className="text-white font-bold text-lg">{exp.role}</h4>
                  <div className="text-green-400 text-sm font-mono mb-2">
                    {exp.company} | {exp.period}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <GraduationCap className="text-blue-400" /> Formação Acadêmica
          </h3>
          <div className="space-y-4">
            {userData.education.map((edu, i) => (
              <div
                key={i}
                className="bg-slate-900 p-5 rounded-lg border border-slate-800 flex items-start gap-4 hover:border-blue-500/30 transition-colors"
              >
                <div className="mt-1 min-w-[40px]">
                  {edu.status === "Concluído" ? (
                    <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400">
                      <Trophy size={16} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-500">
                      <Code size={16} />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold">{edu.degree}</h4>
                  <p className="text-slate-400 text-sm">{edu.institution}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-slate-800 rounded text-xs text-blue-300 font-mono border border-slate-700">
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
