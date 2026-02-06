import { useState, useRef, useCallback } from "react";
import { getRandomMessage } from "@/lib/messages";

interface MessageCarouselProps {
  onDiscover: () => void;
  discoveredCount: number;
}

const CARD_COUNT = 8;

function generateCards() {
  return Array.from({ length: CARD_COUNT }, (_, i) => ({
    id: i,
    message: getRandomMessage(),
  }));
}

export default function MessageCarousel({ onDiscover }: MessageCarouselProps) {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = useState(Math.floor(CARD_COUNT / 2));
  const cardsRef = useRef(generateCards());

  const handleFlip = useCallback((id: number) => {
    if (!flippedCards.has(id)) {
      setFlippedCards(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      onDiscover();
    }
  }, [flippedCards, onDiscover]);

  const wrapIndex = (i: number) => ((i % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;

  const handleSwipe = useCallback((direction: "left" | "right") => {
    setActiveIndex(prev => wrapIndex(direction === "left" ? prev + 1 : prev - 1));
  }, []);

  const cards = cardsRef.current;
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <div className="animate-soft-fade-in">
      {/* Spinning orbit dots */}
      <div className="flex items-center justify-center gap-1 mb-4">
        <div className="relative w-20 h-5">
          {cards.map((_, i) => {
            const angle = (i / CARD_COUNT) * 360;
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                className="absolute animate-carousel-orbit"
                style={{
                  left: '50%',
                  top: '50%',
                  animationDelay: `${-(i / CARD_COUNT) * 8}s`,
                }}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    isActive ? "bg-primary/70 w-3 scale-125" : "bg-muted-foreground/25"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative h-44 flex items-center justify-center">
        {visibleOffsets.map((offset) => {
          const cardIndex = wrapIndex(activeIndex + offset);
          const card = cards[cardIndex];
          const isActive = offset === 0;
          const isFlipped = flippedCards.has(card.id);

          return (
            <div
              key={`${card.id}-${offset}`}
              className="absolute perspective-1000 cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${offset * 80}px) scale(${isActive ? 1 : 0.85}) translateZ(${isActive ? 0 : -30}px)`,
                opacity: Math.abs(offset) > 1 ? 0.3 : Math.abs(offset) === 1 ? 0.6 : 1,
                zIndex: isActive ? 10 : 5 - Math.abs(offset),
              }}
              onClick={() => {
                if (isActive) handleFlip(card.id);
                else setActiveIndex(cardIndex);
              }}
              onTouchStart={(e) => {
                const startX = e.touches[0].clientX;
                const handleEnd = (ev: TouchEvent) => {
                  const diff = ev.changedTouches[0].clientX - startX;
                  if (Math.abs(diff) > 40) {
                    handleSwipe(diff < 0 ? "left" : "right");
                  }
                  document.removeEventListener("touchend", handleEnd);
                };
                document.addEventListener("touchend", handleEnd);
              }}
            >
              <div
                className={`relative w-48 h-36 transition-transform duration-700 ease-out ${isActive && !isFlipped ? "animate-card-hover" : ""}`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                }}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-card border border-border/50 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <span className="text-3xl animate-bob">🐾</span>
                    <p className="text-muted-foreground/40 text-xs mt-2 font-handwritten text-base">
                      tap to read
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-card border border-primary/20 flex items-center justify-center p-5 shadow-lg">
                  <p className="text-foreground/80 text-center font-handwritten text-xl leading-relaxed">
                    {card.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
