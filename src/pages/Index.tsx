import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <section id="products" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary/80 tracking-[0.3em] text-sm uppercase mb-2 block">
              Curated Selection
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              The Collection
            </h2>
          </div>
          
          <ProductGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
