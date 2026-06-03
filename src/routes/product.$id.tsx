import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Heart, Star, Truck, ShieldCheck, RefreshCcw, ChevronRight } from "lucide-react";
import { getProduct, getByCategory, formatPrice, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — AURAÉ VERA` },
          { name: "description", content: loaderData.product.shortDescription },
          { property: "og:title", content: `${loaderData.product.name} — AURAÉ VERA` },
          { property: "og:description", content: loaderData.product.shortDescription },
          { property: "og:image", content: loaderData.product.images[0] },
          { property: "og:type", content: "product" },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <h1 className="font-display text-4xl">Piece not found</h1>
      <Link to="/shop" className="text-gold underline mt-4 inline-block">Continue shopping</Link>
    </div>
  ),
  errorComponent: () => <div className="container-luxe py-32 text-center"><h1 className="font-display text-4xl">Something went wrong</h1></div>,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"details" | "shipping" | "care">("details");
  const { addToCart, toggleWishlist, isWishlisted, pushRecent } = useStore();
  const wished = isWishlisted(product.id);
  const related = getByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);

  useEffect(() => { pushRecent(product.id); }, [product.id, pushRecent]);
  useEffect(() => { setActiveImg(0); setQty(1); }, [product.id]);

  return (
    <>
      <div className="container-luxe pt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-gold">{product.category}</Link> / <span>{product.name}</span>
      </div>

      <section className="container-luxe py-10 grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-3">
          <div className="flex md:flex-col gap-2 md:w-20">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={"aspect-square w-16 md:w-full overflow-hidden bg-cream transition " + (i === activeImg ? "ring-1 ring-gold" : "opacity-60 hover:opacity-100")}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-square overflow-hidden bg-cream group">
            <img src={product.images[activeImg]} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="eyebrow text-gold mb-2">{product.subcategory}</div>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={"h-3.5 w-3.5 " + (i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground")} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating} · {product.reviewCount} reviews</span>
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            {product.salePrice ? (
              <>
                <span className="font-display text-3xl text-gold">{formatPrice(product.salePrice)}</span>
                <span className="line-through text-muted-foreground">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-display text-3xl">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 hover:text-gold">−</button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2.5 hover:text-gold">+</button>
            </div>
            <div className="text-xs text-muted-foreground">{product.stock} in stock · SKU {product.sku}</div>
          </div>

          <div className="flex gap-2 mb-8">
            <button onClick={() => addToCart(product.id, qty)} className="flex-1 py-4 bg-foreground text-background uppercase tracking-[0.22em] text-xs hover:bg-gold transition">Add to Bag</button>
            <button onClick={() => toggleWishlist(product.id)} aria-label="Wishlist" className="px-5 border border-foreground hover:bg-foreground hover:text-background transition">
              <Heart className={"h-5 w-5 " + (wished ? "fill-gold text-gold" : "")} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 border-y border-border py-5 mb-8 text-xs">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /><span>Free shipping</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /><span>Lifetime warranty</span></div>
            <div className="flex items-center gap-2"><RefreshCcw className="h-4 w-4 text-gold" /><span>30-day returns</span></div>
          </div>

          <div className="flex gap-6 border-b border-border mb-4 text-xs uppercase tracking-[0.2em]">
            {[
              { k: "details", label: "Details" },
              { k: "shipping", label: "Shipping" },
              { k: "care", label: "Care" },
            ].map((t) => (
              <button key={t.k} onClick={() => setTab(t.k as any)} className={"pb-3 -mb-px " + (tab === t.k ? "border-b border-gold text-foreground" : "text-muted-foreground hover:text-foreground")}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed min-h-[120px]">
            {tab === "details" && (
              <dl className="grid grid-cols-2 gap-y-3 gap-x-6">
                <dt className="text-foreground">Material</dt><dd>{product.material}</dd>
                <dt className="text-foreground">Weight</dt><dd>{product.weight}</dd>
                <dt className="text-foreground">Dimensions</dt><dd>{product.dimensions}</dd>
                <dt className="text-foreground">Warranty</dt><dd>{product.warranty}</dd>
              </dl>
            )}
            {tab === "shipping" && <p>{product.shipping}</p>}
            {tab === "care" && <p>{product.care}</p>}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-luxe py-16 border-t border-border">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl">You may also love</h2>
            <Link to="/category/$slug" params={{ slug: product.category }} className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] gold-underline">
              Shop {product.category} <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
