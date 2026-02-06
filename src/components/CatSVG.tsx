import type { CatMood } from "@/hooks/useCatState";
import type { TimeOfDay } from "@/hooks/useTimeOfDay";
import type { CatPose } from "./CatCompanion";

interface CatSVGProps {
  mood: CatMood;
  timeOfDay: TimeOfDay;
  activeToy: string | null;
  pose?: CatPose;
}

export default function CatSVG({ mood, timeOfDay, activeToy, pose = "sitting" }: CatSVGProps) {
  const isSleeping = mood === "sleeping";
  const isPurring = mood === "purring";
  const isPlayful = mood === "playful";
  const isStartled = mood === "startled";
  const isJudgmental = mood === "judgmental";
  const isPouncing = activeToy === "laser" || activeToy === "yarn";
  const isReaching = activeToy === "feather";

  return (
    <svg
      width="220"
      height="200"
      viewBox="0 0 220 200"
      className={`
        ${isPurring ? "animate-purr" : ""} 
        ${isSleeping ? "animate-breathe" : ""} 
        ${isPouncing ? "animate-wiggle" : ""}
        ${isReaching ? "animate-reach" : ""}
        transition-transform duration-1000
      `}
      style={{
        filter: `drop-shadow(0 0 ${isPurring ? "40px" : "20px"} hsl(var(--glow-warm) / ${isPurring ? "0.35" : "0.12"}))`,
        transition: "filter 1s ease",
        transform: pose === "stretching" ? "scaleX(1.15) scaleY(0.9)" : pose === "lying" ? "scaleY(0.85) translateY(10px)" : "",
      }}
    >
      {isSleeping || pose === "lying" ? <SleepingCat /> : (
        <SittingCat
          mood={mood}
          isPurring={isPurring}
          isPlayful={isPlayful}
          isStartled={isStartled}
          isJudgmental={isJudgmental}
          isReaching={isReaching}
          pose={pose}
        />
      )}
    </svg>
  );
}

function SleepingCat() {
  return (
    <>
      <path
        d="M155,155 Q175,130 170,110 Q165,95 155,100 Q148,105 150,115"
        stroke="hsl(var(--cat-ginger))"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="110" cy="155" rx="58" ry="22" fill="hsl(var(--cat-ginger))" />
      <ellipse cx="110" cy="158" rx="40" ry="12" fill="hsl(var(--cat-ginger-light))" opacity="0.4" />
      <path d="M85,147 Q90,142 95,147" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.25" />
      <path d="M105,145 Q110,140 115,145" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.25" />
      <path d="M125,147 Q130,142 135,147" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.25" />
      <circle cx="65" cy="145" r="24" fill="hsl(var(--cat-ginger))" />
      <circle cx="55" cy="152" r="6" fill="hsl(var(--cat-ginger-light))" opacity="0.3" />
      <polygon points="46,130 52,108 64,126" fill="hsl(var(--cat-ginger-dark))" />
      <polygon points="72,124 82,108 88,130" fill="hsl(var(--cat-ginger-dark))" />
      <polygon points="49,129 53,112 62,126" fill="hsl(var(--cat-nose))" opacity="0.15" />
      <polygon points="74,125 82,112 86,129" fill="hsl(var(--cat-nose))" opacity="0.15" />
      <path d="M53,143 Q58,139 63,143" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M69,141 Q74,137 79,141" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M66,149 L64,152 L68,152 Z" fill="hsl(var(--cat-nose))" />
      <path d="M63,154 Q66,156 69,154" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" fill="none" />
      <ellipse cx="52" cy="165" rx="10" ry="6" fill="hsl(var(--cat-ginger))" />
      <path d="M45,165 L47,163" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.6" opacity="0.3" />
      <path d="M48,165 L50,163" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.6" opacity="0.3" />
      <text x="95" y="120" fill="hsl(var(--muted-foreground))" fontSize="16" fontFamily="var(--font-handwritten)" opacity="0.35" className="animate-float">z</text>
      <text x="108" y="108" fill="hsl(var(--muted-foreground))" fontSize="13" fontFamily="var(--font-handwritten)" opacity="0.25" className="animate-float" style={{ animationDelay: "0.7s" }}>z</text>
      <text x="118" y="98" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="var(--font-handwritten)" opacity="0.15" className="animate-float" style={{ animationDelay: "1.4s" }}>z</text>
    </>
  );
}

interface SittingCatProps {
  mood: CatMood;
  isPurring: boolean;
  isPlayful: boolean;
  isStartled: boolean;
  isJudgmental: boolean;
  isReaching: boolean;
  pose: CatPose;
}

function SittingCat({ mood, isPurring, isPlayful, isStartled, isJudgmental, isReaching, pose }: SittingCatProps) {
  return (
    <>
      {/* Tail */}
      <path
        d={isPlayful
          ? "M165,145 Q190,115 185,80 Q180,55 168,62"
          : "M165,145 Q180,125 175,100 Q170,80 160,85"
        }
        stroke="hsl(var(--cat-ginger))"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
        className={isPlayful ? "animate-tail" : ""}
        style={{ transition: "d 1s ease" }}
      />
      <path
        d={isPlayful
          ? "M175,105 Q180,95 178,85"
          : "M170,115 Q175,105 173,95"
        }
        stroke="hsl(var(--cat-ginger-dark))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* Body */}
      <ellipse cx="110" cy="145" rx="44" ry="30" fill="hsl(var(--cat-ginger))" />
      <ellipse cx="110" cy="130" rx="28" ry="22" fill="hsl(var(--cat-ginger-light))" opacity="0.45" />
      <path d="M82,138 Q88,132 94,138" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.2" />
      <path d="M100,134 Q106,128 112,134" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.2" />
      <path d="M118,136 Q124,130 130,136" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.2" />

      {/* Back legs */}
      <ellipse cx="135" cy="168" rx="14" ry="8" fill="hsl(var(--cat-ginger))" />
      <ellipse cx="85" cy="168" rx="14" ry="8" fill="hsl(var(--cat-ginger))" />

      {/* Front paws */}
      <g className={isPurring ? "animate-knead" : ""}>
        <ellipse cx="90" cy="172" rx="10" ry="7" fill="hsl(var(--cat-ginger))" />
        <circle cx="86" cy="174" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.2" />
        <circle cx="90" cy="175" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.2" />
        <circle cx="94" cy="174" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.2" />
      </g>
      <g className={isPurring ? "animate-knead" : ""} style={{ animationDelay: "0.3s" }}>
        <ellipse cx="130" cy="172" rx="10" ry="7" fill="hsl(var(--cat-ginger))" />
        <circle cx="126" cy="174" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.2" />
        <circle cx="130" cy="175" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.2" />
        <circle cx="134" cy="174" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.2" />
      </g>

      {/* Head */}
      <circle
        cx="110"
        cy="82"
        r={isStartled ? 34 : 32}
        fill="hsl(var(--cat-ginger))"
        style={{ transition: "r 0.3s ease" }}
      />
      <circle cx="82" cy="92" r="10" fill="hsl(var(--cat-ginger-light))" opacity="0.3" />
      <circle cx="138" cy="92" r="10" fill="hsl(var(--cat-ginger-light))" opacity="0.3" />

      {/* Ears */}
      <g className={isStartled ? "" : "animate-ear-twitch"}>
        <polygon
          points={isStartled ? "80,60 86,26 100,54" : "82,62 88,32 102,56"}
          fill="hsl(var(--cat-ginger-dark))"
        />
        <polygon
          points={isStartled ? "84,58 87,32 98,54" : "86,60 89,36 100,56"}
          fill="hsl(var(--cat-nose))"
          opacity="0.18"
        />
      </g>
      <g>
        <polygon
          points={isStartled ? "120,54 134,26 140,60" : "118,56 132,32 138,62"}
          fill="hsl(var(--cat-ginger-dark))"
        />
        <polygon
          points={isStartled ? "122,54 134,32 138,58" : "120,56 132,36 136,60"}
          fill="hsl(var(--cat-nose))"
          opacity="0.18"
        />
      </g>

      {/* Forehead stripes */}
      <path d="M100,62 Q103,56 106,62" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M106,62 Q109,55 112,62" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M112,62 Q115,56 118,62" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.35" />

      {/* Eyes */}
      <CatEyes isStartled={isStartled} isJudgmental={isJudgmental} isPurring={isPurring} />

      {/* Nose */}
      <path d="M110,88 L107,92 L113,92 Z" fill="hsl(var(--cat-nose))" />
      <circle cx="109" cy="89" r="1" fill="hsl(var(--cat-nose))" opacity="0.4" />

      {/* Mouth */}
      {isPurring ? (
        <>
          <path d="M104,94 Q110,99 116,94" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M140,82 L148,80" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.6" opacity="0.3" className="animate-float" />
          <path d="M140,86 L148,86" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.6" opacity="0.3" className="animate-float" style={{ animationDelay: "0.3s" }} />
        </>
      ) : isStartled ? (
        <ellipse cx="110" cy="96" rx="3" ry="4" fill="hsl(var(--cat-ginger-dark))" opacity="0.6" />
      ) : (
        <>
          <path d="M107,93 Q104,96 101,95" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M113,93 Q116,96 119,95" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Whiskers */}
      <g opacity="0.45">
        <line x1="70" y1="85" x2="92" y2="88" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.7" />
        <line x1="68" y1="90" x2="92" y2="91" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.7" />
        <line x1="72" y1="96" x2="92" y2="94" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.7" />
        <line x1="128" y1="88" x2="150" y2="85" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.7" />
        <line x1="128" y1="91" x2="152" y2="90" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.7" />
        <line x1="128" y1="94" x2="148" y2="96" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.7" />
      </g>

      {/* Blush when purring */}
      {isPurring && (
        <>
          <circle cx="88" cy="90" r="5" fill="hsl(var(--cat-nose))" opacity="0.12" />
          <circle cx="132" cy="90" r="5" fill="hsl(var(--cat-nose))" opacity="0.12" />
        </>
      )}

      {/* Reaching paw */}
      {isReaching && (
        <g className="animate-reach-paw">
          <ellipse cx="130" cy="120" rx="8" ry="6" fill="hsl(var(--cat-ginger))"
            style={{ transform: "rotate(-30deg)", transformOrigin: "130px 120px" }}
          />
        </g>
      )}
    </>
  );
}

function CatEyes({ isStartled, isJudgmental, isPurring }: { isStartled: boolean; isJudgmental: boolean; isPurring: boolean }) {
  if (isJudgmental) {
    return (
      <>
        <g>
          <ellipse cx="97" cy="78" rx="7" ry="3.5" fill="hsl(var(--cat-ginger-dark))" />
          <ellipse cx="97" cy="79" rx="4" ry="2.5" fill="hsl(45 80% 45%)" />
          <ellipse cx="97" cy="79" rx="2" ry="2" fill="hsl(var(--cat-ginger-dark))" opacity="0.8" />
        </g>
        <g>
          <ellipse cx="123" cy="78" rx="7" ry="3.5" fill="hsl(var(--cat-ginger-dark))" />
          <ellipse cx="123" cy="79" rx="4" ry="2.5" fill="hsl(45 80% 45%)" />
          <ellipse cx="123" cy="79" rx="2" ry="2" fill="hsl(var(--cat-ginger-dark))" opacity="0.8" />
        </g>
        <path d="M90,76 Q97,73 104,76" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" />
        <path d="M116,76 Q123,73 130,76" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" />
      </>
    );
  }

  if (isStartled) {
    return (
      <>
        <g>
          <circle cx="97" cy="77" r="9" fill="hsl(0 0% 95%)" />
          <circle cx="97" cy="77" r="7" fill="hsl(45 80% 50%)" />
          <circle cx="97" cy="77" r="4" fill="hsl(var(--cat-ginger-dark))" />
          <circle cx="95" cy="74" r="2" fill="hsl(0 0% 100%)" />
          <circle cx="99" cy="79" r="1" fill="hsl(0 0% 100%)" opacity="0.6" />
        </g>
        <g>
          <circle cx="123" cy="77" r="9" fill="hsl(0 0% 95%)" />
          <circle cx="123" cy="77" r="7" fill="hsl(45 80% 50%)" />
          <circle cx="123" cy="77" r="4" fill="hsl(var(--cat-ginger-dark))" />
          <circle cx="121" cy="74" r="2" fill="hsl(0 0% 100%)" />
          <circle cx="125" cy="79" r="1" fill="hsl(0 0% 100%)" opacity="0.6" />
        </g>
      </>
    );
  }

  return (
    <>
      <g className="animate-blink" style={{ transformOrigin: "97px 77px" }}>
        <ellipse cx="97" cy="77" rx="8" ry="7.5" fill="hsl(0 0% 92%)" />
        <circle cx="97" cy="77" r="5.5" fill="hsl(45 80% 50%)" />
        <circle cx="97" cy="77" r="4" fill="hsl(45 70% 42%)" opacity="0.5" />
        <ellipse cx="97" cy="77" rx={isPurring ? 2 : 2.5} ry={isPurring ? 3.5 : 4} fill="hsl(var(--cat-ginger-dark))" />
        <circle cx="95" cy="74" r="1.8" fill="hsl(0 0% 100%)" />
        <circle cx="99" cy="79" r="0.8" fill="hsl(0 0% 100%)" opacity="0.5" />
      </g>
      <g className="animate-blink" style={{ transformOrigin: "123px 77px", animationDelay: "0.1s" }}>
        <ellipse cx="123" cy="77" rx="8" ry="7.5" fill="hsl(0 0% 92%)" />
        <circle cx="123" cy="77" r="5.5" fill="hsl(45 80% 50%)" />
        <circle cx="123" cy="77" r="4" fill="hsl(45 70% 42%)" opacity="0.5" />
        <ellipse cx="123" cy="77" rx={isPurring ? 2 : 2.5} ry={isPurring ? 3.5 : 4} fill="hsl(var(--cat-ginger-dark))" />
        <circle cx="121" cy="74" r="1.8" fill="hsl(0 0% 100%)" />
        <circle cx="125" cy="79" r="0.8" fill="hsl(0 0% 100%)" opacity="0.5" />
      </g>
    </>
  );
}
