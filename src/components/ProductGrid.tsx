import { useEffect, useState } from "react";
import { ShopifyProduct, storefrontApiRequest, PRODUCTS_QUERY } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, Package } from "lucide-react";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 12 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-heading text-2xl text-foreground mb-2">No Products Yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your store is ready! Tell me about the products you'd like to add — include the name, description, and price, and I'll create them for you.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
};
