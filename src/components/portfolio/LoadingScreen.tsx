import { Terminal } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-green-500 font-mono">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-green-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Terminal size={20} className="text-green-500/50" />
        </div>
      </div>
      <p className="animate-pulse mt-4 tracking-widest">LOADING ASSETS...</p>
    </div>
  );
}
