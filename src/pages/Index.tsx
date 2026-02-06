import { useState, useCallback } from "react";
import IntroScreen from "@/components/IntroScreen";
import CatSetup from "@/components/CatSetup";
import CatCompanion from "@/components/CatCompanion";
import MessageCarousel from "@/components/MessageCarousel";
import StarField from "@/components/StarField";
import ActionPanel from "@/components/ActionPanel";
import MiniPlayer from "@/components/MiniPlayer";
import { useCatState } from "@/hooks/useCatState";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import type { CatPersonality } from "@/hooks/useCatState";

type AppPhase = "intro" | "setup" | "main";

const Index = () => {
  const timeOfDay = useTimeOfDay();
  const cat = useCatState(timeOfDay);

  const initialPhase: AppPhase = cat.hasBeenIntroduced ? "main" : "intro";
  const [phase, setPhase] = useState<AppPhase>(initialPhase);

  const handleIntroComplete = useCallback(() => {
    if (cat.name) {
      setPhase("main");
      cat.markIntroduced();
    } else {
      setPhase("setup");
    }
  }, [cat]);

  const handleSetupComplete = useCallback(
    (name: string, personality: CatPersonality) => {
      cat.setName(name);
      cat.setPersonality(personality);
      cat.markIntroduced();
      setPhase("main");
    },
    [cat]
  );


  const handlePet = useCallback(() => {
    cat.interact();
  }, [cat]);

  const handleTap = useCallback(() => {
    cat.interact();
  }, [cat]);

  const handleLongPress = useCallback(() => {
    cat.interact();
  }, [cat]);

  const handleRapidTap = useCallback(() => {
    cat.interact();
  }, [cat]);

  // Action panel handlers
  const handleShake = useCallback(() => {
    cat.interact();
    cat.setMood("startled");
  }, [cat]);

  const handleRub = useCallback(() => {
    cat.interact();
    cat.setMood("purring");
  }, [cat]);

  const handleTouch = useCallback(() => {
    cat.interact();
  }, [cat]);

  if (phase === "intro") {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  if (phase === "setup") {
    return <CatSetup onComplete={handleSetupComplete} />;
  }

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden transition-all duration-[2000ms]"
      style={{
        background: `radial-gradient(ellipse at 50% 80%, hsl(var(--muted) / 0.5) 0%, hsl(var(--background)) 60%)`,
      }}
    >
      <StarField />
      <MiniPlayer audioSrc="/only-you.mp3"/>
      <ActionPanel onShake={handleShake} onRub={handleRub} onTouch={handleTouch} />

      {/* Main cat area */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <CatCompanion
          name={cat.name}
          mood={cat.mood}
          timeOfDay={timeOfDay}
          isQuiet={false}
          onPet={handlePet}
          onTap={handleTap}
          onLongPress={handleLongPress}
          onRapidTap={handleRapidTap}
          onMoodChange={cat.setMood}
        />
      </div>

      {/* Message cards area - always visible */}
      <div className="pb-8 px-4 z-10">
        <MessageCarousel
          onDiscover={cat.discoverCard}
          discoveredCount={cat.cardsDiscovered}
        />
      </div>
    </div>
  );
};

export default Index;
