"use client";

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-black overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-3 text-xs tracking-widest uppercase font-semibold whitespace-nowrap transition-colors ${
            active === tab.id
              ? "border-b-2 border-black text-black"
              : "text-black/50 hover:text-black"
          }`}
          style={{ marginBottom: active === tab.id ? "-1px" : "0" }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
