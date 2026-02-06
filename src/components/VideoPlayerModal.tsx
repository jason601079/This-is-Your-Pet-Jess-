import { X, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  prompt: string;
}

export function VideoPlayerModal({ isOpen, onClose, videoUrl, prompt }: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `video-${Date.now()}.mp4`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-5xl mx-4 animate-scale-in">
        {/* Close button */}
        <Button
          variant="glass"
          size="icon"
          className="absolute -top-12 right-0 rounded-full"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Video container */}
        <div className="glass rounded-2xl overflow-hidden glow-primary">
          <div className="aspect-video bg-secondary/50">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full h-full object-contain"
              playsInline
            />
          </div>

          {/* Info bar */}
          <div className="p-4 flex items-center justify-between border-t border-border/50">
            <p className="text-sm text-foreground line-clamp-1 flex-1 mr-4">{prompt}</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
