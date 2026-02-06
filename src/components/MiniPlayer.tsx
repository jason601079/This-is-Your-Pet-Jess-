import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Music } from "lucide-react";

interface MiniPlayerProps {
  audioSrc?: string;
  title?: string;
  artist?: string;
}

export default function MiniPlayer({
  audioSrc,
  title = "Only You (ft. Burna Boy)",
  artist = "J. Cole — The Fall Off",
}: MiniPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number>();

  const [isPlaying, setIsPlaying] = useState(false);
  // Assume audio exists if audioSrc is provided
  const [hasAudio, setHasAudio] = useState(!!audioSrc);
  const [progress, setProgress] = useState(0);

  // Setup audio element (mobile + desktop safe)
  useEffect(() => {
    if (!audioSrc || !audioRef.current) return;

    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.4;

    const onError = () => {
      setHasAudio(false);
      setIsPlaying(false);
    };

    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("error", onError);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [audioSrc]);

  // Progress tracking
  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, updateProgress]);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div className="fixed top-4 left-4 z-30">
      {/* DOM-mounted audio element (mobile-safe) */}
      <audio ref={audioRef} src={audioSrc} preload="none" playsInline />

      <div className="bg-card/70 backdrop-blur-md border border-border/40 rounded-2xl px-3 py-2.5 flex items-center gap-3 shadow-lg min-w-[200px]">
        {/* Music icon */}
        <div
          className={`w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 ${
            isPlaying ? "animate-pulse-slow" : ""
          }`}
        >
          <Music size={16} className="text-primary/70" />
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="text-foreground/80 text-xs font-medium truncate leading-tight">
            {title}
          </p>
          <p className="text-muted-foreground/50 text-[10px] truncate leading-tight mt-0.5">
            {artist}
          </p>

          {/* Progress bar */}
          {hasAudio && (
            <div className="w-full h-0.5 bg-muted/40 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-primary/50 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          disabled={!hasAudio}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            hasAudio
              ? "bg-primary/20 hover:bg-primary/35 active:scale-90 text-primary/80"
              : "bg-muted/20 text-muted-foreground/30 cursor-not-allowed"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={14} />
          ) : (
            <Play size={14} className="ml-0.5" />
          )}
        </button>
      </div>

      {/* Hint if audio really not found */}
      {!hasAudio && (
        <p className="text-muted-foreground/25 text-[9px] mt-1.5 text-center font-handwritten">
          audio not found
        </p>
      )}
    </div>
  );
}
