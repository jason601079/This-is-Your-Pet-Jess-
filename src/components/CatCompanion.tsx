import { useState, useCallback, useRef, useEffect } from "react";
import type { CatMood } from "@/hooks/useCatState";
import type { TimeOfDay } from "@/hooks/useTimeOfDay";
import { getRandomReaction } from "@/lib/messages";
import CatSVG from "./CatSVG";
import CatToys, { type ToyType } from "./CatToys";

export type CatPose = "sitting" | "lying" | "stretching" | "standing";

interface CatCompanionProps {
  name: string;
  mood: CatMood;
  timeOfDay: TimeOfDay;
  isQuiet: boolean;
  onPet: () => void;
  onTap: () => void;
  onLongPress: () => void;
  onRapidTap: () => void;
  onMoodChange: (mood: CatMood) => void;
}

export default function CatCompanion({
  name,
  mood,
  timeOfDay,
  isQuiet,
  onPet,
  onTap,
  onLongPress,
  onRapidTap,
  onMoodChange,
}: CatCompanionProps) {
  const [reaction, setReaction] = useState<string | null>(null);
  const [showReaction, setShowReaction] = useState(false);
  const [activeToy, setActiveToy] = useState<ToyType>(null);
  const [pose, setPose] = useState<CatPose>("sitting");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wanderTimerRef = useRef<NodeJS.Timeout | null>(null);

  const displayReaction = useCallback((text: string) => {
    setReaction(text);
    setShowReaction(true);
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      setShowReaction(false);
    }, 2500);
  }, []);

  // Random wandering
  useEffect(() => {
    const wander = () => {
      const poses: CatPose[] = ["sitting", "lying", "stretching", "standing"];
      const newPose = poses[Math.floor(Math.random() * poses.length)];
      const newX = -40 + Math.random() * 80;
      const newY = -20 + Math.random() * 40;
      setPose(newPose);
      setPosition({ x: newX, y: newY });

      // Return to sitting after stretching
      if (newPose === "stretching") {
        setTimeout(() => setPose("sitting"), 2000);
      }

      wanderTimerRef.current = setTimeout(wander, 8000 + Math.random() * 6000);
    };

    wanderTimerRef.current = setTimeout(wander, 10000);
    return () => {
      if (wanderTimerRef.current) clearTimeout(wanderTimerRef.current);
    };
  }, []);

  const handleSelectToy = useCallback((toy: ToyType) => {
    setActiveToy(toy);
    if (toyTimerRef.current) clearTimeout(toyTimerRef.current);

    if (toy) {
      const toyReactions: Record<string, string[]> = {
        laser: ["!!!", "*eyes widen*", "*butt wiggle*", "*POUNCE*", "...where'd it go?"],
        yarn: ["*bats at it*", "*rolls with it*", "mine.", "*tangles self*", "*kicks*"],
        feather: ["*swat*", "*reaches up*", "...almost...", "*SWAT*", "hm. fluffy."],
      };
      const reactions = toyReactions[toy] || ["?"];

      setTimeout(() => {
        const r = reactions[Math.floor(Math.random() * reactions.length)];
        displayReaction(r);
        onMoodChange("playful");
        setPose("standing");
      }, 600);

      toyTimerRef.current = setTimeout(() => {
        setActiveToy(null);
        if (mood !== "sleeping") onMoodChange("awake");
        displayReaction("*loses interest*");
        setPose("sitting");
      }, 6000);
    }
  }, [displayReaction, onMoodChange, mood]);

  const handleToyInteraction = useCallback(() => {
    onTap();
  }, [onTap]);

  // Public interaction methods for ActionPanel
  const handleShake = useCallback(() => {
    onRapidTap();
    onMoodChange("startled");
    displayReaction(getRandomReaction("rapidTap"));
    setPose("standing");
    setTimeout(() => {
      onMoodChange("judgmental");
      setPose("sitting");
    }, 500);
    setTimeout(() => {
      if (mood !== "sleeping") onMoodChange("awake");
    }, 3000);
  }, [onRapidTap, onMoodChange, displayReaction, mood]);

  const handleRub = useCallback(() => {
    onPet();
    onMoodChange("purring");
    displayReaction(getRandomReaction("longPress"));
    setPose("lying");
    setTimeout(() => {
      if (mood !== "sleeping") {
        onMoodChange("awake");
        setPose("sitting");
      }
    }, 4000);
  }, [onPet, onMoodChange, displayReaction, mood]);

  const handleTouch = useCallback(() => {
    onTap();
    displayReaction(getRandomReaction("tap"));
    // Ear twitch is handled by the SVG
  }, [onTap, displayReaction]);

  // Expose these to parent via a ref-like pattern through props
  // Actually, we receive these from parent - let's handle via onPointerDown etc.

  const handlePointerDown = useCallback(() => {
    longPressTimerRef.current = setTimeout(() => {
      onLongPress();
      onMoodChange("purring");
      displayReaction(getRandomReaction("longPress"));
      setPose("lying");
      setTimeout(() => {
        if (mood !== "sleeping") {
          onMoodChange("awake");
          setPose("sitting");
        }
      }, 4000);
    }, 800);
  }, [onLongPress, onMoodChange, displayReaction, mood]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);

    tapTimerRef.current = setTimeout(() => {
      if (tapCountRef.current >= 5) {
        onRapidTap();
        onMoodChange("startled");
        displayReaction(getRandomReaction("rapidTap"));
        setPose("standing");
        setTimeout(() => {
          onMoodChange("judgmental");
          setPose("sitting");
        }, 500);
        setTimeout(() => {
          if (mood !== "sleeping") onMoodChange("awake");
        }, 3000);
      } else if (tapCountRef.current >= 2) {
        onPet();
        onMoodChange("purring");
        displayReaction(getRandomReaction("pet"));
        setPose("lying");
        setTimeout(() => {
          if (mood !== "sleeping") {
            onMoodChange("awake");
            setPose("sitting");
          }
        }, 3000);
      } else {
        onTap();
        displayReaction(getRandomReaction("tap"));
      }
      tapCountRef.current = 0;
    }, 400);
  }, [onPet, onTap, onRapidTap, onMoodChange, displayReaction, mood]);

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      if (toyTimerRef.current) clearTimeout(toyTimerRef.current);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Reaction bubble */}
      <div
        className={`absolute -top-20 left-1/2 -translate-x-1/2 transition-all duration-700 z-30 ${
          showReaction ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-5 py-2.5 shadow-lg">
          <p className="text-foreground/80 font-handwritten text-xl whitespace-nowrap">
            {reaction}
          </p>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card/80 border-r border-b border-border/50 rotate-45" />
      </div>

      {/* Cat name */}
      <p className="text-muted-foreground/40 text-xs mb-2 font-handwritten text-base tracking-wide">
        {name}
      </p>

      {/* The Cat - now with position and pose */}
      <div
        className={`cursor-pointer select-none transition-all duration-[1500ms] ease-in-out ${
          mood === "startled" ? "animate-startled" : ""
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <CatSVG mood={mood} timeOfDay={timeOfDay} activeToy={activeToy} pose={pose} />
      </div>

      {/* Subtle glow under cat */}
      <div
        className="w-40 h-5 rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse, hsl(var(--glow-warm) / ${mood === "purring" ? "0.25" : "0.08"}) 0%, transparent 70%)`,
          filter: `blur(${mood === "purring" ? "10px" : "5px"})`,
          transform: `translateX(${position.x}px)`,
        }}
      />

      {/* Toy buttons */}
      <div className="mt-4">
        <CatToys
          activeToy={activeToy}
          onSelectToy={handleSelectToy}
          onToyInteraction={handleToyInteraction}
          isQuiet={isQuiet}
        />
      </div>
    </div>
  );
}

// Export interaction handlers type for parent to use
export type CatInteractionHandlers = {
  onShake: () => void;
  onRub: () => void;
  onTouch: () => void;
};
