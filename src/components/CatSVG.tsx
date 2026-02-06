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
      {/* Curled tail */}
      <path
        d="M155,155 Q175,130 170,110 Q165,95 155,100 Q148,105 150,115"
        stroke="hsl(var(--cat-ginger))"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Body curl */}
      <ellipse cx="110" cy="155" rx="58" ry="22" fill="hsl(var(--cat-ginger))" />
      <ellipse cx="110" cy="158" rx="40" ry="12" fill="hsl(var(--cat-ginger-light))" opacity="0.35" />
      
      {/* Subtle body stripes */}
      <path d="M85,147 Q90,142 95,147" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.2" />
      <path d="M105,145 Q110,140 115,145" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.2" />
      <path d="M125,147 Q130,142 135,147" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" opacity="0.2" />
      
      {/* Head */}
      <circle cx="65" cy="145" r="26" fill="hsl(var(--cat-ginger))" />
      {/* Cheek highlight */}
      <circle cx="53" cy="152" r="7" fill="hsl(var(--cat-ginger-light))" opacity="0.25" />
      
      {/* Ears */}
      <polygon points="44,128 50,104 64,123" fill="hsl(var(--cat-ginger-dark))" />
      <polygon points="74,122 84,104 90,128" fill="hsl(var(--cat-ginger-dark))" />
      <polygon points="47,126 51,109 62,123" fill="hsl(var(--cat-nose))" opacity="0.12" />
      <polygon points="76,122 84,109 88,127" fill="hsl(var(--cat-nose))" opacity="0.12" />
      
      {/* Closed eyes - cute curved lines */}
      <path d="M52,142 Q58,137 64,142" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M68,140 Q74,135 80,140" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      
      {/* Little eyelashes */}
      <line x1="53" y1="140" x2="51" y2="138" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1" opacity="0.4" />
      <line x1="69" y1="138" x2="67" y2="136" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1" opacity="0.4" />
      
      {/* Nose */}
      <ellipse cx="66" cy="149" rx="3" ry="2.5" fill="hsl(var(--cat-nose))" />
      <circle cx="65" cy="148" r="0.8" fill="hsl(0 0% 100%)" opacity="0.3" />
      
      {/* Mouth */}
      <path d="M63,152 Q66,155 69,152" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" fill="none" />
      
      {/* Tiny paw poking out */}
      <ellipse cx="52" cy="165" rx="10" ry="6" fill="hsl(var(--cat-ginger))" />
      <circle cx="47" cy="166" r="2" fill="hsl(var(--cat-nose))" opacity="0.15" />
      <circle cx="51" cy="167" r="2" fill="hsl(var(--cat-nose))" opacity="0.15" />
      <circle cx="55" cy="166" r="2" fill="hsl(var(--cat-nose))" opacity="0.15" />
      
      {/* Z's */}
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
      {/* Tail - thicker with fluffy tip */}
      <path
        d={isPlayful
          ? "M160,150 Q185,115 180,78 Q176,55 165,62"
          : "M160,150 Q178,120 172,95 Q166,75 155,82"
        }
        stroke="hsl(var(--cat-ginger))"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        className={isPlayful ? "animate-tail" : "animate-tail-idle"}
        style={{ transition: "d 1s ease" }}
      />
      {/* Tail fluff tip */}
      <circle
        cx={isPlayful ? "165" : "155"}
        cy={isPlayful ? "62" : "82"}
        r="7"
        fill="hsl(var(--cat-ginger))"
      />
      {/* Tail stripe */}
      <path
        d={isPlayful ? "M175,100 Q178,90 176,80" : "M168,110 Q172,100 170,90"}
        stroke="hsl(var(--cat-ginger-dark))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.2"
      />

      {/* Body - rounder, friendlier */}
      <ellipse cx="110" cy="148" rx="46" ry="32" fill="hsl(var(--cat-ginger))" />
      {/* Belly fluff */}
      <ellipse cx="110" cy="155" rx="30" ry="18" fill="hsl(var(--cat-ginger-light))" opacity="0.35" />
      {/* Body stripes */}
      <path d="M82,140 Q88,134 94,140" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.4" fill="none" opacity="0.18" />
      <path d="M100,136 Q106,130 112,136" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.4" fill="none" opacity="0.18" />
      <path d="M118,138 Q124,132 130,138" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.4" fill="none" opacity="0.18" />

      {/* Back legs - rounder */}
      <ellipse cx="138" cy="170" rx="15" ry="9" fill="hsl(var(--cat-ginger))" />
      <ellipse cx="82" cy="170" rx="15" ry="9" fill="hsl(var(--cat-ginger))" />

      {/* Front paws - chunkier with toe beans */}
      <g className={isPurring ? "animate-knead" : ""}>
        <ellipse cx="92" cy="174" rx="12" ry="8" fill="hsl(var(--cat-ginger))" />
        <circle cx="87" cy="176" r="2" fill="hsl(var(--cat-nose))" opacity="0.18" />
        <circle cx="92" cy="177" r="2" fill="hsl(var(--cat-nose))" opacity="0.18" />
        <circle cx="97" cy="176" r="2" fill="hsl(var(--cat-nose))" opacity="0.18" />
        <ellipse cx="92" cy="179" rx="4" ry="2.5" fill="hsl(var(--cat-nose))" opacity="0.12" />
      </g>
      <g className={isPurring ? "animate-knead" : ""} style={{ animationDelay: "0.3s" }}>
        <ellipse cx="128" cy="174" rx="12" ry="8" fill="hsl(var(--cat-ginger))" />
        <circle cx="123" cy="176" r="2" fill="hsl(var(--cat-nose))" opacity="0.18" />
        <circle cx="128" cy="177" r="2" fill="hsl(var(--cat-nose))" opacity="0.18" />
        <circle cx="133" cy="176" r="2" fill="hsl(var(--cat-nose))" opacity="0.18" />
        <ellipse cx="128" cy="179" rx="4" ry="2.5" fill="hsl(var(--cat-nose))" opacity="0.12" />
      </g>

      {/* Head - bigger and rounder */}
      <circle
        cx="110"
        cy="82"
        r={isStartled ? 37 : 35}
        fill="hsl(var(--cat-ginger))"
        style={{ transition: "r 0.3s ease" }}
      />
      {/* Head highlight */}
      <circle cx="100" cy="72" r="14" fill="hsl(var(--cat-ginger-light))" opacity="0.2" />
      
      {/* Cheeks - fuller, more kawaii */}
      <circle cx="80" cy="92" r="13" fill="hsl(var(--cat-ginger-light))" opacity="0.25" />
      <circle cx="140" cy="92" r="13" fill="hsl(var(--cat-ginger-light))" opacity="0.25" />

      {/* Ears - larger and more expressive */}
      <g className={isStartled ? "" : "animate-ear-twitch"}>
        <polygon
          points={isStartled ? "78,58 84,20 102,52" : "80,60 86,26 104,54"}
          fill="hsl(var(--cat-ginger-dark))"
        />
        <polygon
          points={isStartled ? "82,56 85,28 100,52" : "84,58 87,32 102,54"}
          fill="hsl(var(--cat-nose))"
          opacity="0.15"
        />
        {/* Ear tuft */}
        <line
          x1={isStartled ? "88" : "90"}
          y1={isStartled ? "42" : "46"}
          x2={isStartled ? "92" : "94"}
          y2={isStartled ? "36" : "40"}
          stroke="hsl(var(--cat-ginger-light))"
          strokeWidth="2"
          opacity="0.4"
          strokeLinecap="round"
        />
      </g>
      <g>
        <polygon
          points={isStartled ? "118,52 136,20 142,58" : "116,54 132,26 140,60"}
          fill="hsl(var(--cat-ginger-dark))"
        />
        <polygon
          points={isStartled ? "120,52 136,28 140,56" : "118,54 132,32 138,58"}
          fill="hsl(var(--cat-nose))"
          opacity="0.15"
        />
        {/* Ear tuft */}
        <line
          x1={isStartled ? "130" : "128"}
          y1={isStartled ? "42" : "46"}
          x2={isStartled ? "134" : "132"}
          y2={isStartled ? "36" : "40"}
          stroke="hsl(var(--cat-ginger-light))"
          strokeWidth="2"
          opacity="0.4"
          strokeLinecap="round"
        />
      </g>

      {/* Forehead M mark - classic tabby */}
      <path d="M98,60 Q103,52 108,60" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M102,60 Q107,50 112,60" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M108,60 Q113,52 118,60" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" opacity="0.3" />

      {/* Eyes - bigger, more expressive */}
      <CatEyes isStartled={isStartled} isJudgmental={isJudgmental} isPurring={isPurring} />

      {/* Nose - heart-shaped */}
      <path d="M107,88 Q110,84 113,88 Q113,92 110,94 Q107,92 107,88 Z" fill="hsl(var(--cat-nose))" />
      <circle cx="109" cy="87" r="1.2" fill="hsl(0 0% 100%)" opacity="0.35" />

      {/* Mouth */}
      {isPurring ? (
        <>
          <path d="M104,95 Q110,101 116,95" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Purr lines */}
          <path d="M142,82 L150,80" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" opacity="0.3" className="animate-float" />
          <path d="M142,87 L150,87" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" opacity="0.3" className="animate-float" style={{ animationDelay: "0.3s" }} />
          <path d="M142,92 L149,93" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" opacity="0.3" className="animate-float" style={{ animationDelay: "0.6s" }} />
        </>
      ) : isStartled ? (
        <ellipse cx="110" cy="97" rx="4" ry="5" fill="hsl(var(--cat-ginger-dark))" opacity="0.5" />
      ) : (
        <>
          <path d="M107,95 Q103,98 100,97" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M113,95 Q117,98 120,97" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Whiskers - longer, more graceful */}
      <g opacity="0.4" className="animate-whisker">
        <line x1="65" y1="84" x2="90" y2="88" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" />
        <line x1="63" y1="90" x2="90" y2="92" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" />
        <line x1="67" y1="96" x2="90" y2="95" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" />
        <line x1="130" y1="88" x2="155" y2="84" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" />
        <line x1="130" y1="92" x2="157" y2="90" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" />
        <line x1="130" y1="95" x2="153" y2="96" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="0.8" />
      </g>

      {/* Blush when purring - softer pink circles */}
      {isPurring && (
        <>
          <circle cx="85" cy="92" r="7" fill="hsl(var(--cat-nose))" opacity="0.1" />
          <circle cx="135" cy="92" r="7" fill="hsl(var(--cat-nose))" opacity="0.1" />
          {/* Little hearts */}
          <text x="148" y="68" fontSize="12" opacity="0.3" className="animate-float" style={{ animationDelay: "0.5s" }}>💕</text>
        </>
      )}

      {/* Chest fluff detail */}
      <path d="M100,115 Q105,108 110,115 Q115,108 120,115" stroke="hsl(var(--cat-ginger-light))" strokeWidth="1.5" fill="none" opacity="0.3" />

      {/* Reaching paw */}
      {isReaching && (
        <g className="animate-reach-paw">
          <ellipse cx="130" cy="120" rx="9" ry="7" fill="hsl(var(--cat-ginger))"
            style={{ transform: "rotate(-30deg)", transformOrigin: "130px 120px" }}
          />
          <circle cx="127" cy="122" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.15" />
          <circle cx="131" cy="123" r="1.5" fill="hsl(var(--cat-nose))" opacity="0.15" />
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
          <ellipse cx="95" cy="78" rx="9" ry="4" fill="hsl(0 0% 15%)" />
          <ellipse cx="95" cy="79" rx="5" ry="3" fill="hsl(45 80% 50%)" />
          <ellipse cx="95" cy="79" rx="2" ry="2.5" fill="hsl(0 0% 10%)" />
          <circle cx="93" cy="77" r="1.2" fill="hsl(0 0% 100%)" opacity="0.5" />
        </g>
        <g>
          <ellipse cx="125" cy="78" rx="9" ry="4" fill="hsl(0 0% 15%)" />
          <ellipse cx="125" cy="79" rx="5" ry="3" fill="hsl(45 80% 50%)" />
          <ellipse cx="125" cy="79" rx="2" ry="2.5" fill="hsl(0 0% 10%)" />
          <circle cx="123" cy="77" r="1.2" fill="hsl(0 0% 100%)" opacity="0.5" />
        </g>
        {/* Heavy eyelids */}
        <path d="M86,75 Q95,71 104,75" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="2" fill="none" />
        <path d="M116,75 Q125,71 134,75" stroke="hsl(var(--cat-ginger-dark))" strokeWidth="2" fill="none" />
      </>
    );
  }

  if (isStartled) {
    return (
      <>
        <g>
          <circle cx="95" cy="77" r="11" fill="hsl(0 0% 95%)" />
          <circle cx="95" cy="77" r="9" fill="hsl(45 85% 52%)" />
          <circle cx="95" cy="77" r="5" fill="hsl(0 0% 8%)" />
          <circle cx="93" cy="74" r="2.5" fill="hsl(0 0% 100%)" />
          <circle cx="98" cy="79" r="1.2" fill="hsl(0 0% 100%)" opacity="0.5" />
        </g>
        <g>
          <circle cx="125" cy="77" r="11" fill="hsl(0 0% 95%)" />
          <circle cx="125" cy="77" r="9" fill="hsl(45 85% 52%)" />
          <circle cx="125" cy="77" r="5" fill="hsl(0 0% 8%)" />
          <circle cx="123" cy="74" r="2.5" fill="hsl(0 0% 100%)" />
          <circle cx="128" cy="79" r="1.2" fill="hsl(0 0% 100%)" opacity="0.5" />
        </g>
      </>
    );
  }

  return (
    <>
      {/* Left eye */}
      <g className="animate-blink" style={{ transformOrigin: "95px 77px" }}>
        <ellipse cx="95" cy="77" rx="10" ry="9" fill="hsl(0 0% 95%)" />
        <circle cx="95" cy="77" r="7" fill="hsl(45 85% 52%)" />
        <circle cx="95" cy="77" r="5" fill="hsl(45 75% 44%)" opacity="0.5" />
        <ellipse cx="95" cy="77" rx={isPurring ? 2.5 : 3} ry={isPurring ? 4 : 4.5} fill="hsl(0 0% 8%)" />
        {/* Catchlight */}
        <circle cx="92" cy="74" r="2.2" fill="hsl(0 0% 100%)" />
        <circle cx="97" cy="79" r="1" fill="hsl(0 0% 100%)" opacity="0.45" />
      </g>
      {/* Right eye */}
      <g className="animate-blink" style={{ transformOrigin: "125px 77px", animationDelay: "0.1s" }}>
        <ellipse cx="125" cy="77" rx="10" ry="9" fill="hsl(0 0% 95%)" />
        <circle cx="125" cy="77" r="7" fill="hsl(45 85% 52%)" />
        <circle cx="125" cy="77" r="5" fill="hsl(45 75% 44%)" opacity="0.5" />
        <ellipse cx="125" cy="77" rx={isPurring ? 2.5 : 3} ry={isPurring ? 4 : 4.5} fill="hsl(0 0% 8%)" />
        {/* Catchlight */}
        <circle cx="122" cy="74" r="2.2" fill="hsl(0 0% 100%)" />
        <circle cx="127" cy="79" r="1" fill="hsl(0 0% 100%)" opacity="0.45" />
      </g>
    </>
  );
}
