interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center text-xs font-black border transition-colors
                ${i < current ? "bg-black text-white border-black" : ""}
                ${i === current ? "bg-white text-black border-black" : ""}
                ${i > current ? "bg-white text-black/30 border-black/30" : ""}
              `}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`text-[9px] tracking-widest uppercase font-semibold whitespace-nowrap ${
                i === current ? "text-black" : "text-black/40"
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-[1px] w-12 mx-2 mb-6 transition-colors ${
                i < current ? "bg-black" : "bg-black/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
