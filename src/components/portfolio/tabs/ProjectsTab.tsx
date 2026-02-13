import { Trophy } from "lucide-react";
import { userData } from "@/lib/data/userData";
import { ProjectCard } from "../ProjectCard";

export function ProjectsTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" /> Portfólio de Projetos
          </h2>
          <p className="text-slate-400 mt-2">
            Destaques da trajetória profissional e acadêmica.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {userData.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
