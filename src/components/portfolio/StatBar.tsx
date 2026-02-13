interface StatBarProps {
  label: string;
  value: number;
  color?: string;
}

export function StatBar({ label, value, color = "bg-green-500" }: StatBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-mono text-slate-300">{label}</span>
        <span className="text-sm font-mono text-slate-500">{value}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2.5 border border-slate-700">
        <div
          className={`h-2.5 rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
