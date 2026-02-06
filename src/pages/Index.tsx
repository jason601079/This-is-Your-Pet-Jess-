import { useState, useCallback, useEffect, useRef } from "react";
import IntroScreen from "@/components/IntroScreen";
import CatSetup from "@/components/CatSetup";
import CatCompanion from "@/components/CatCompanion";
import MessageCarousel from "@/components/MessageCarousel";
import StarField from "@/components/StarField";
import ActionPanel from "@/components/ActionPanel";
import { useCatState } from "@/hooks/useCatState";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import type { CatPersonality } from "@/hooks/useCatState";

type AppPhase = "intro" | "setup" | "main";

const Index = () => {
  const timeOfDay = useTimeOfDay();
  const cat = useCatState(timeOfDay);
  const [showCards, setShowCards] = useState(false);
  const [cardTriggerCount, setCardTriggerCount] = useState(0);
  const catRef = useRef<{ onShake: () => void; onRub: () => void; onTouch: () => void } | null>(null);

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

  // Occasionally trigger cards after interactions
  useEffect(() => {
    if (cat.interactionCount > 0 && cat.interactionCount % 4 === 0) {
      setShowCards(true);
      setCardTriggerCount(prev => prev + 1);
    }
  }, [cat.interactionCount]);

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

      {/* Message cards area */}
      <div className="pb-8 px-4 z-10">
        {showCards ? (
          <MessageCarousel
            visible={showCards}
            onDiscover={cat.discoverCard}
            discoveredCount={cat.cardsDiscovered}
          />
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground/20 text-xs font-handwritten text-sm animate-soft-fade-in">
              {cat.interactionCount === 0
                ? "tap to say hello"
                : cat.interactionCount < 4
                ? "keep playing..."
                : ""}
            </p>
          </div>
        )}
      </div>

      {/* Hide cards button */}
      {showCards && (
        <button
          onClick={() => setShowCards(false)}
          className="fixed bottom-3 right-4 text-muted-foreground/20 text-xs hover:text-muted-foreground/40 transition-colors duration-500 z-20 font-handwritten"
        >
          hide cards
        </button>
      )}
    </div>
  );
};

export default Index;
