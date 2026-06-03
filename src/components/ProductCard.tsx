import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const onSale = product.salePrice != null;
  return (
    <div className="group relative">
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
          {product.badges[0] && (
            <span className="absolute top-3 left-3 bg-background/90 backdrop-blur px-2 py-1 text-[10px] tracking-[0.2em] uppercase">
              {product.badges[0] === "bestseller" ? "Best Seller" : product.badges[0] === "new" ? "New" : product.badges[0]}
            </span>
          )}
          {onSale && (
            <span className="absolute top-3 right-3 bg-gold text-gold-foreground px-2 py-1 text-[10px] tracking-[0.2em] uppercase">Sale</span>
          )}
        </div>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute bottom-[88px] right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:text-gold"
      >
        <Heart className={"h-4 w-4 " + (wished ? "fill-gold text-gold" : "")} />
      </button>
      <div className="pt-4 space-y-1">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.subcategory}</div>
        <Link to="/product/$id" params={{ id: product.id }} className="block font-display text-lg leading-snug hover:text-gold transition">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {onSale ? (
            <>
              <span className="text-gold font-medium">{formatPrice(product.salePrice!)}</span>
              <span className="line-through text-muted-foreground">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="font-medium">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
