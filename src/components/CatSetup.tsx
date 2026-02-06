import { useState } from "react";
import type { CatPersonality } from "@/hooks/useCatState";

interface CatSetupProps {
  onComplete: (name: string, personality: CatPersonality) => void;
}

const personalities: { value: CatPersonality; emoji: string; label: string }[] = [
  { value: "playful", emoji: "✨", label: "playful" },
  { value: "sleepy", emoji: "💤", label: "sleepy" },
  { value: "curious", emoji: "👀", label: "curious" },
  { value: "aloof-soft", emoji: "🌙", label: "quietly loving" },
];

export default function CatSetup({ onComplete }: CatSetupProps) {
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState<CatPersonality>("curious");
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-8 bg-background">
      {step === 0 && (
        <div className="animate-soft-fade-in text-center max-w-xs w-full">
          <p className="text-muted-foreground font-handwritten text-xl mb-8">
            this little one needs a name...
          </p>

          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="whisper a name"
            className="bg-transparent border-b border-border text-foreground text-center text-lg w-full py-3 focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/40 font-handwritten text-2xl transition-colors duration-500"
            autoFocus
            maxLength={20}
          />

          {name.trim().length > 0 && (
            <button
              onClick={() => setStep(1)}
              className="mt-8 text-muted-foreground/50 hover:text-foreground text-sm transition-all duration-700 animate-soft-fade-in font-handwritten text-lg"
            >
              that's perfect →
            </button>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="animate-soft-fade-in text-center max-w-xs w-full">
          <p className="text-muted-foreground font-handwritten text-xl mb-2">
            {name} seems...
          </p>

          <div className="flex flex-col gap-3 mt-8">
            {personalities.map(p => (
              <button
                key={p.value}
                onClick={() => setPersonality(p.value)}
                className={`py-3 px-6 rounded-lg text-sm transition-all duration-500 font-handwritten text-xl ${
                  personality === p.value
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                }`}
              >
                {p.emoji} {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onComplete(name.trim(), personality)}
            className="mt-8 text-muted-foreground/50 hover:text-foreground text-sm transition-all duration-700 font-handwritten text-lg"
          >
            hello, {name} 🧡
          </button>
        </div>
      )}
    </div>
  );
}
