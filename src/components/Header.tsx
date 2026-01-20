import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl tracking-[0.2em] text-foreground hover:text-primary transition-colors">
          STYLE HAVEN
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            Collections
          </Link>
          <Link to="/" className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            New Arrivals
          </Link>
          <Link to="/" className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
