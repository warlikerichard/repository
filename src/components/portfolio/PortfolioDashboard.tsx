"use client";

import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { userData } from "@/lib/data/userData";
import {
  Navigation,
  LoadingScreen,
  ProfileTab,
  SkillsTab,
  ProjectsTab,
  AIChatTab,
  ContactTab,
} from ".";
import type { TabId } from "./types";

export function PortfolioDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-sans selection:bg-green-500 selection:text-slate-900 overflow-hidden">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 relative overflow-hidden flex flex-col h-screen">
        {/* Background Grid Effect */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"
          aria-hidden
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 pb-24 md:pb-12 z-10">
          {/* Header Mobile */}
          <div className="md:hidden flex items-center gap-4 mb-8 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-900/20">
              <Terminal size={24} className="text-slate-900" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">{userData.name}</h1>
              <p className="text-green-400 text-xs font-mono">{userData.role}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {activeTab === "profile" && (
              <ProfileTab setActiveTab={setActiveTab} />
            )}
            {activeTab === "skills" && <SkillsTab />}
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "ai-chat" && <AIChatTab />}
            {activeTab === "contact" && <ContactTab />}
          </div>
        </div>
      </main>
    </div>
  );
}
