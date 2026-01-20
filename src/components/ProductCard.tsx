import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const node = product.node;
  const image = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });

    toast.success("Added to bag", {
      description: node.title,
      position: "top-center"
    });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="hover-lift rounded-sm overflow-hidden bg-card border border-border/50">
        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover image-zoom"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Bag
              </>
            )}
          </Button>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-heading text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {node.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {node.description || "No description available"}
          </p>
          <p className="text-primary font-medium">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};
