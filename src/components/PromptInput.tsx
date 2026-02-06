import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Video, Loader2 } from "lucide-react";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const examplePrompts = [
    "A serene sunset over calm ocean waves",
    "Astronaut floating through colorful nebula",
    "Time-lapse of flowers blooming in spring",
    "Cinematic drone shot of misty mountains",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass rounded-2xl p-2 animate-glow">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create..."
                className="w-full bg-transparent border-none outline-none resize-none pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground min-h-[60px] max-h-[120px] text-base"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                }}
                disabled={isGenerating}
              />
            </div>
            <Button
              type="submit"
              variant="glow"
              size="xl"
              disabled={!prompt.trim() || isGenerating}
              className="shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" />
                  <span>Generate</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="text-muted-foreground text-sm">Try:</span>
        {examplePrompts.map((example, index) => (
          <button
            key={index}
            onClick={() => setPrompt(example)}
            className="text-sm px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 border border-border/50 hover:border-primary/30"
            disabled={isGenerating}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
