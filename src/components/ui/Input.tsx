import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs tracking-widest uppercase font-semibold">
          {label}
        </label>
      )}
      <input
        className={`border border-black px-4 py-3 text-sm font-semibold bg-white text-black placeholder:text-black/40 ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-semibold">{error}</span>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs tracking-widest uppercase font-semibold">
          {label}
        </label>
      )}
      <textarea
        className={`border border-black px-4 py-3 text-sm font-semibold bg-white text-black placeholder:text-black/40 resize-none ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-semibold">{error}</span>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = "", ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs tracking-widest uppercase font-semibold">
          {label}
        </label>
      )}
      <select
        className={`border border-black px-4 py-3 text-sm font-semibold bg-white text-black ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600 font-semibold">{error}</span>}
    </div>
  );
}
