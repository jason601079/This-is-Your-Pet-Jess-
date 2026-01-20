import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
          const firstVariant = data.data.productByHandle.variants?.edges?.[0]?.node;
          if (firstVariant) {
            setSelectedVariant(firstVariant.id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const currentVariant = product?.variants?.edges?.find(
    (v) => v.node.id === selectedVariant
  )?.node;

  const handleAddToCart = async () => {
    if (!product || !currentVariant) return;

    await addItem({
      product: { node: product },
      variantId: currentVariant.id,
      variantTitle: currentVariant.title,
      price: currentVariant.price,
      quantity,
      selectedOptions: currentVariant.selectedOptions || []
    });

    toast.success("Added to bag", {
      description: `${quantity}x ${product.title}`,
      position: "top-center"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 container mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const price = currentVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted rounded-sm overflow-hidden">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-2">
                  {product.title}
                </h1>
                <p className="text-2xl text-primary font-heading">
                  {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description || "No description available"}
              </p>

              {/* Options */}
              {product.options && product.options.length > 0 && product.options[0].name !== 'Title' && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variant = product.variants?.edges?.find((v) =>
                            v.node.selectedOptions?.some(
                              (o) => o.name === option.name && o.value === value
                            )
                          );
                          const isSelected = currentVariant?.selectedOptions?.some(
                            (o) => o.name === option.name && o.value === value
                          );

                          return (
                            <button
                              key={value}
                              onClick={() => variant && setSelectedVariant(variant.node.id)}
                              className={`px-4 py-2 border rounded-sm text-sm transition-colors ${
                                isSelected
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border hover:border-primary text-foreground'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !currentVariant?.availableForSale}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-sm tracking-widest uppercase"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : !currentVariant?.availableForSale ? (
                  'Out of Stock'
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Bag
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
