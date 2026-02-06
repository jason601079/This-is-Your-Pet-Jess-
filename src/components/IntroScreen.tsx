import { useState, useEffect, useRef, useCallback } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState(0);
  const [shakeReaction, setShakeReaction] = useState<string | null>(null);
  const shakeCountRef = useRef(0);
  const lastShakeRef = useRef(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 7000),
      setTimeout(() => setPhase(4), 10000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleShake = useCallback(() => {
    const reactions = ["...really?", "I was SLEEPING.", "ugh.", "*annoyed glare*", "RUDE.", "five more minutes..."];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    setShakeReaction(reaction);
    shakeCountRef.current += 1;

    if (shakeCountRef.current >= 3) {
      setTimeout(() => onComplete(), 1500);
    } else {
      setTimeout(() => setShakeReaction(null), 2000);
    }
  }, [onComplete]);

  // DeviceMotion shake detection
  useEffect(() => {
    if (phase < 3) return;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const magnitude = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
      const now = Date.now();

      if (magnitude > 25 && now - lastShakeRef.current > 1000) {
        lastShakeRef.current = now;
        handleShake();
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [phase, handleShake]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-8"
      style={{ backgroundColor: `hsl(var(--night-deep))` }}
    >
      {/* First text */}
      <div
        className={`text-center transition-all duration-[2000ms] ease-out ${
          phase >= 1 && phase < 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-foreground/80 text-lg font-light italic font-handwritten text-2xl tracking-wide">
          For your eyes only.
        </p>
      </div>

      {/* Second text */}
      <div
        className={`text-center mt-6 transition-all duration-[2000ms] ease-out ${
          phase >= 2 && phase < 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-muted-foreground text-base font-light font-handwritten text-xl">
          This is a gift, not an expectation.
        </p>
      </div>

      {/* Wake up prompt */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex flex-col items-center transition-all duration-[2000ms] ease-out ${
          phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Sleeping cat silhouette */}
        <div className={`mb-6 ${shakeReaction ? "animate-startled" : ""}`}>
          <SleepingCatSilhouette isAnnoyed={!!shakeReaction} />
        </div>

        {/* Shake reaction bubble */}
        {shakeReaction && (
          <div className="absolute bottom-32 animate-soft-fade-in">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-5 py-2.5 shadow-lg">
              <p className="text-foreground/80 font-handwritten text-xl whitespace-nowrap">
                {shakeReaction}
              </p>
            </div>
          </div>
        )}

        {phase >= 4 && !shakeReaction && (
          <div className="flex flex-col items-center gap-3 mb-12 animate-soft-fade-in">
            <p
              className="text-muted-foreground/60 text-sm font-light font-handwritten text-lg cursor-pointer hover:text-foreground/80 transition-colors duration-700"
              onClick={onComplete}
            >
              Wake them up… or don't.
            </p>
            <p className="text-muted-foreground/30 text-xs font-handwritten text-sm animate-float">
              📱 try shaking your phone...
            </p>
          </div>
        )}
      </div>

      {/* Tap anywhere after phase 4 */}
      {phase >= 4 && (
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onComplete}
          style={{ zIndex: -1 }}
        />
      )}
    </div>
  );
}

function SleepingCatSilhouette({ isAnnoyed }: { isAnnoyed: boolean }) {
  return (
    <svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      className={isAnnoyed ? "" : "animate-breathe"}
      style={{ filter: `drop-shadow(0 0 20px hsl(var(--glow-warm) / 0.15))` }}
    >
      {/* Body */}
      <ellipse cx="60" cy="45" rx="40" ry="15" fill="hsl(var(--cat-ginger))" opacity="0.9" />
      {/* Head */}
      <circle cx="30" cy="38" r="14" fill="hsl(var(--cat-ginger))" />
      {/* Ears */}
      <polygon points="20,28 24,16 30,26" fill="hsl(var(--cat-ginger-dark))" />
      <polygon points="36,26 40,16 44,28" fill="hsl(var(--cat-ginger-dark))" />
      {/* Inner ears */}
      <polygon points="22,27 25,18 29,26" fill="hsl(var(--cat-nose) / 0.3)" />
      <polygon points="37,26 40,18 43,27" fill="hsl(var(--cat-nose) / 0.3)" />
      {/* Eyes */}
      {isAnnoyed ? (
        <>
          {/* Annoyed half-open eyes */}
          <ellipse cx="24" cy="37" rx="3" ry="1.5" fill="hsl(var(--cat-ginger-dark))" />
          <ellipse cx="35" cy="36" rx="3" ry="1.5" fill="hsl(var(--cat-ginger-dark))" />
          {/* Annoyed eyebrows */}
          <path d="M21,34 L27,35" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1" />
          <path d="M38,34 L32,35" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1" />
        </>
      ) : (
        <>
          <path d="M24,38 Q27,36 30,38" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" />
          <path d="M32,37 Q35,35 38,37" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" />
        </>
      )}
      {/* Nose */}
      <ellipse cx="30" cy="41" rx="2" ry="1.5" fill="hsl(var(--cat-nose))" />
      {/* Tail curled around */}
      <path
        d="M100,42 Q110,30 105,20 Q100,12 92,18"
        stroke="hsl(var(--cat-ginger))"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Stripes */}
      <path d="M50,35 Q55,32 60,35" stroke="hsl(var(--cat-ginger-dark) / 0.3)" strokeWidth="1" fill="none" />
      <path d="M58,34 Q63,31 68,34" stroke="hsl(var(--cat-ginger-dark) / 0.3)" strokeWidth="1" fill="none" />
      <path d="M66,35 Q71,32 76,35" stroke="hsl(var(--cat-ginger-dark) / 0.3)" strokeWidth="1" fill="none" />
      {/* Zzz */}
      {!isAnnoyed && (
        <>
          <text x="48" y="22" fill="hsl(var(--muted-foreground) / 0.4)" fontSize="10" fontFamily="var(--font-handwritten)" className="animate-float">
            z
          </text>
          <text x="56" y="14" fill="hsl(var(--muted-foreground) / 0.3)" fontSize="8" fontFamily="var(--font-handwritten)" className="animate-float" style={{ animationDelay: '0.5s' }}>
            z
          </text>
        </>
      )}
    </svg>
  );
}
