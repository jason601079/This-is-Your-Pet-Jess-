import { useState, useEffect, useRef } from "react";
import { Sparkles, Circle, Wind } from "lucide-react";

export type ToyType = "laser" | "yarn" | "feather" | null;

interface CatToysProps {
  activeToy: ToyType;
  onSelectToy: (toy: ToyType) => void;
  onToyInteraction: () => void;
  isQuiet: boolean;
}

export default function CatToys({ activeToy, onSelectToy, onToyInteraction, isQuiet }: CatToysProps) {
  if (isQuiet) return null;

  return (
    <div className="flex flex-col items-center gap-3 z-20">
      {activeToy && (
        <div className="mb-2">
          <ActiveToyDisplay toy={activeToy} />
        </div>
      )}

      <div className="flex items-center gap-4">
        <ToyButton
          icon={<Circle size={24} className="fill-current" />}
          label="laser"
          isActive={activeToy === "laser"}
          onClick={() => {
            onSelectToy(activeToy === "laser" ? null : "laser");
            onToyInteraction();
          }}
          color="text-destructive/60 hover:text-destructive/80"
        />
        <ToyButton
          icon={<Sparkles size={24} />}
          label="yarn"
          isActive={activeToy === "yarn"}
          onClick={() => {
            onSelectToy(activeToy === "yarn" ? null : "yarn");
            onToyInteraction();
          }}
          color="text-primary/60 hover:text-primary/80"
        />
        <ToyButton
          icon={<Wind size={24} />}
          label="feather"
          isActive={activeToy === "feather"}
          onClick={() => {
            onSelectToy(activeToy === "feather" ? null : "feather");
            onToyInteraction();
          }}
          color="text-secondary/60 hover:text-secondary/80"
        />
      </div>
    </div>
  );
}

function ToyButton({
  icon,
  label,
  isActive,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-3.5 rounded-xl transition-all duration-500 ${
        isActive
          ? "bg-card/60 border border-border/50 scale-110"
          : "bg-transparent border border-transparent hover:bg-card/30"
      } ${color}`}
      aria-label={`Play with ${label}`}
    >
      {icon}
      <span className="text-xs font-handwritten text-muted-foreground/40">{label}</span>
    </button>
  );
}

function ActiveToyDisplay({ toy }: { toy: ToyType }) {
  if (toy === "laser") return <LaserDot />;
  if (toy === "yarn") return <YarnBall />;
  if (toy === "feather") return <FeatherWand />;
  return null;
}

function LaserDot() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const move = () => {
      setPos({
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
      });
    };
    move();
    intervalRef.current = setInterval(move, 800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30 transition-all duration-500 ease-out"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <div className="w-5 h-5 rounded-full bg-destructive/80 animate-pulse"
        style={{
          boxShadow: "0 0 16px 6px hsl(var(--destructive) / 0.4), 0 0 32px 12px hsl(var(--destructive) / 0.2)",
        }}
      />
    </div>
  );
}

function YarnBall() {
  return (
    <div className="animate-yarn-bounce">
      <div className="w-14 h-14 rounded-full relative"
        style={{
          background: `radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.5))`,
          boxShadow: "0 2px 12px hsl(var(--primary) / 0.3)",
        }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56">
          <path d="M14,18 Q28,10 42,20" stroke="hsl(var(--primary-foreground))" strokeWidth="0.8" fill="none" opacity="0.3" />
          <path d="M10,32 Q28,24 46,32" stroke="hsl(var(--primary-foreground))" strokeWidth="0.8" fill="none" opacity="0.3" />
          <path d="M16,42 Q28,36 40,42" stroke="hsl(var(--primary-foreground))" strokeWidth="0.8" fill="none" opacity="0.3" />
        </svg>
      </div>
      <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2" width="40" height="28" viewBox="0 0 40 28">
        <path d="M20,0 Q26,10 16,16 Q10,20 20,26" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FeatherWand() {
  return (
    <div className="animate-feather-dangle">
      <svg width="60" height="90" viewBox="0 0 60 90">
        {/* String */}
        <path d="M30,0 Q33,22 27,45" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="1.5" fill="none" />
        {/* Feather */}
        <g style={{ transform: "translate(14px, 42px) rotate(15deg)" }}>
          <path d="M0,0 Q12,-6 28,0 Q12,6 0,0" fill="hsl(var(--secondary) / 0.6)" />
          <path d="M0,0 L28,0" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="0.8" />
          <path d="M6,-2 L9,-5" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="0.5" />
          <path d="M12,-2 L15,-5" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="0.5" />
          <path d="M18,-2 L21,-5" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="0.5" />
          <path d="M6,2 L9,5" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="0.5" />
          <path d="M12,2 L15,5" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="0.5" />
          <path d="M18,2 L21,5" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="0.5" />
        </g>
        {/* Bell */}
        <circle cx="27" cy="46" r="4" fill="hsl(var(--primary) / 0.5)" />
        <circle cx="25" cy="44" r="1.2" fill="hsl(var(--primary) / 0.3)" />
      </svg>
    </div>
  );
}
