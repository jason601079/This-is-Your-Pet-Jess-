import { Video, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">VideoAI</span>
        </div>
        
        <nav className="flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
}
