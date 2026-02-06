import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { VideoPlayerModal } from "./VideoPlayerModal";

interface Video {
  id: string;
  prompt: string;
  status: "generating" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  createdAt: Date;
}

interface VideoGalleryProps {
  videos: Video[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <section className="w-full max-w-6xl mx-auto mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold">Your Creations</h2>
          <span className="text-sm text-muted-foreground">{videos.length} video{videos.length !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard 
              key={video.id} 
              {...video} 
              onPlay={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </section>

      {selectedVideo && selectedVideo.videoUrl && (
        <VideoPlayerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.videoUrl}
          prompt={selectedVideo.prompt}
        />
      )}
    </>
  );
}
