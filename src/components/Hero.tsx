import heroImage from "@/assets/hero-fashion.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Style Haven Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl fade-in-up">
          <span className="text-primary/80 tracking-[0.3em] text-sm uppercase mb-4 block stagger-1">
            New Collection 2025
          </span>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-6 leading-[1.1] stagger-2">
            Elevate Your
            <br />
            <span className="text-primary italic">Style</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mb-8 font-light stagger-3">
            Discover curated pieces that define modern elegance. Where timeless design meets contemporary fashion.
          </p>
          <Button 
            onClick={scrollToProducts}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm px-8 py-6 text-sm tracking-widest uppercase stagger-4"
          >
            Shop Collection
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};
