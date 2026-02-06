import { useState, useEffect, useRef, useCallback } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-8 cursor-pointer"
      style={{ backgroundColor: `hsl(var(--night-deep))` }}
      onClick={() => {
        if (phase >= 3) onComplete();
      }}
    >
      {/* First text */}
      <div
        className={`text-center transition-all duration-[2000ms] ease-out ${
          phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-foreground/80 text-lg font-light italic font-handwritten text-2xl tracking-wide">
          For your eyes only.
        </p>
      </div>

      {/* Second text */}
      <div
        className={`text-center mt-6 transition-all duration-[2000ms] ease-out ${
          phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-muted-foreground text-base font-light font-handwritten text-xl">
          This is a gift, not an expectation.
        </p>
      </div>

      {/* Press here to continue */}
      <div
        className={`absolute bottom-20 left-0 right-0 flex flex-col items-center transition-all duration-[2000ms] ease-out ${
          phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Paw print */}
          <span className="text-3xl animate-bob">🐾</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="group relative px-8 py-4 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 active:scale-95 transition-all duration-500"
          >
            <p className="text-foreground/60 font-handwritten text-xl group-hover:text-foreground/90 transition-colors duration-500">
              press here to continue
            </p>
            <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <p className="text-muted-foreground/20 text-xs font-handwritten animate-float mt-2">
            something is waiting for you...
          </p>
        </div>
      </div>
    </div>
  );
}
