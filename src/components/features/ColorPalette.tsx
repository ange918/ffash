interface ColorSwatch {
  hex: string;
  nom: string;
}

interface ColorPaletteProps {
  palette: ColorSwatch[];
}

export function ColorPalette({ palette }: ColorPaletteProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {palette.map((color) => (
        <div key={color.hex} className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-16 border border-black"
            style={{ backgroundColor: color.hex }}
          />
          <span className="text-[9px] font-semibold text-center tracking-wide uppercase">
            {color.nom}
          </span>
          <span className="text-[9px] font-semibold text-black/50 uppercase">
            {color.hex}
          </span>
        </div>
      ))}
    </div>
  );
}
