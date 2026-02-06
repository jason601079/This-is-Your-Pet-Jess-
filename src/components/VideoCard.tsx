import { Play, Download, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  id: string;
  prompt: string;
  status: "generating" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
  onPlay?: () => void;
}

export function VideoCard({ prompt, status, videoUrl, thumbnailUrl, createdAt, onPlay }: VideoCardProps) {
  const formatTime = (date: Date) => {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return `${Math.round(diffHours / 24)}d ago`;
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = `video-${Date.now()}.mp4`;
      link.click();
    }
  };

  return (
    <div 
      className="group glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:glow-primary cursor-pointer"
      onClick={status === "completed" && videoUrl ? onPlay : undefined}
    >
      <div className="aspect-video relative bg-secondary/50 overflow-hidden">
        {status === "generating" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-sm text-muted-foreground">Creating your video...</p>
          </div>
        ) : status === "completed" && videoUrl ? (
          <>
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={prompt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button variant="glow" size="lg" className="rounded-full">
                <Play className="w-5 h-5" />
                <span>Play</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-destructive">Generation failed</p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm text-foreground line-clamp-2">{prompt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(createdAt)}</span>
          </div>
          {status === "completed" && videoUrl && (
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleDownload}>
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
