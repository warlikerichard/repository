"use client";

import {
  User,
  Cpu,
  Gamepad2,
  MessageSquare,
  Mail,
  Terminal,
} from "lucide-react";
import { userData } from "@/lib/data/userData";
import type { LucideIcon } from "lucide-react";

type TabId = "profile" | "skills" | "projects" | "ai-chat" | "contact";

interface NavigationProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const tabs: { id: TabId; icon: LucideIcon; label: string }[] = [
  { id: "profile", icon: User, label: "Perfil" },
  { id: "skills", icon: Cpu, label: "Habilidades" },
  { id: "projects", icon: Gamepad2, label: "Projetos" },
  { id: "ai-chat", icon: MessageSquare, label: "AI Chat" },
  { id: "contact", icon: Mail, label: "Contato" },
];

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full md:static md:w-64 md:h-screen bg-slate-900 border-t md:border-t-0 md:border-r border-slate-700 z-50 flex flex-col">
      <div className="hidden md:flex flex-col items-center p-8 border-b border-slate-700 bg-slate-900/50">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.3)] border-2 border-slate-800">
          <Terminal size={40} className="text-white drop-shadow-md" />
        </div>
        <h1 className="text-white font-bold text-lg text-center leading-tight">
          {userData.name}
        </h1>
        <p className="text-green-400 text-xs font-mono text-center mt-2 px-2 py-1 bg-green-900/20 rounded border border-green-900/50">
          {userData.role}
        </p>
      </div>

      <div className="flex md:flex-col justify-around md:justify-start w-full h-16 md:h-auto overflow-x-auto md:overflow-visible md:pt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 md:w-full p-4 flex flex-col md:flex-row items-center md:gap-4 transition-all duration-200 group
              ${
                activeTab === tab.id
                  ? "bg-slate-800 text-green-400 border-t-2 md:border-t-0 md:border-l-4 border-green-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
          >
            <tab.icon
              size={20}
              className={`transition-transform duration-300 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-110"}`}
            />
            <span className="text-[10px] md:text-sm font-mono mt-1 md:mt-0 whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden md:block mt-auto p-6">
        <div className="text-[10px] text-slate-500 font-mono text-center border border-slate-800 rounded p-2 bg-slate-950/50">
          SYSTEM STATUS: ONLINE <br />
          LOC: {userData.location}
          <span className="text-green-500 animate-pulse ml-2">●</span>
        </div>
      </div>
    </nav>
  );
}
