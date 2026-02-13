import { Code } from "lucide-react";
import { userData } from "@/lib/data/userData";
import { StatBar } from "../StatBar";

export function SkillsTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <Code className="text-green-400" /> Habilidades Técnicas
      </h2>
      <p className="text-slate-400">
        Visão geral das competências técnicas e linguísticas.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="w-2 h-6 bg-blue-500 rounded" /> Linguagens & Web
          </h3>
          {userData.skills
            .filter((s) => ["lang", "web"].includes(s.type))
            .map((skill, i) => (
              <StatBar
                key={i}
                label={skill.name}
                value={skill.level}
                color="bg-blue-500"
              />
            ))}
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="w-2 h-6 bg-purple-500 rounded" /> Mobile & Tools
            </h3>
            {userData.skills
              .filter((s) => !["lang", "web"].includes(s.type))
              .map((skill, i) => (
                <StatBar
                  key={i}
                  label={skill.name}
                  value={skill.level}
                  color="bg-purple-500"
                />
              ))}
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-yellow-500 rounded" /> Idiomas
            </h3>
            <div className="flex flex-wrap gap-3">
              {userData.languages.map((lang, i) => (
                <div
                  key={i}
                  className="bg-slate-950 px-4 py-2 rounded border border-slate-700 flex items-center gap-2"
                >
                  <span className="text-white font-bold">{lang.name}</span>
                  <span className="text-xs text-yellow-500 font-mono px-2 py-0.5 bg-yellow-900/20 rounded">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
