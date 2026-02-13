import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-green-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] flex flex-col h-full">
      <div className="aspect-video w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-green-400 leading-tight">
            {project.title}
          </h3>
          <span className="px-2 py-1 text-xs bg-slate-900 border border-slate-600 rounded text-slate-400 whitespace-nowrap ml-2">
            {project.category}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded border border-green-900/50"
            >
              {t}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 bg-slate-700 hover:bg-green-600 text-white rounded font-mono text-sm transition-colors flex items-center justify-center gap-2 mt-auto"
          >
            <ExternalLink size={16} />
            Acessar (Accéder)
          </a>
        )}
      </div>
    </div>
  );
}
