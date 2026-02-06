import { Moon, Sun } from "lucide-react";

interface QuietModeProps {
  isQuiet: boolean;
  onToggle: () => void;
}

export default function QuietMode({ isQuiet, onToggle }: QuietModeProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-6 right-6 p-2 rounded-full transition-all duration-1000 z-20 ${
        isQuiet
          ? "bg-muted/30 text-muted-foreground/30"
          : "bg-transparent text-muted-foreground/40 hover:text-foreground/60"
      }`}
      aria-label="Toggle quiet mode"
    >
      {isQuiet ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
