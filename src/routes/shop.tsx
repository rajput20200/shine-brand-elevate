import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, formatPrice, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — AURAÉ VERA" },
      { name: "description", content: "Browse the complete AURAÉ VERA collection of rings, necklaces, earrings, bracelets and watches." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [maxPrice, setMaxPrice] = useState(15000);

  const filtered = useMemo(() => {
    let r = PRODUCTS.filter((p) => (cat === "all" || p.category === cat) && (p.salePrice ?? p.price) <= maxPrice);
    if (sort === "price-asc") r = [...r].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === "price-desc") r = [...r].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [cat, sort, maxPrice]);

  return (
    <>
      <section className="container-luxe pt-12 pb-8 text-center">
        <div className="eyebrow text-gold mb-3">The Complete Collection</div>
        <h1 className="font-display text-5xl md:text-6xl">Shop AURAÉ VERA</h1>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{PRODUCTS.length} pieces, each hand-finished in our atelier.</p>
      </section>

      <section className="container-luxe pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setCat("all")} className={"px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition " + (cat === "all" ? "bg-foreground text-background" : "hover:text-gold")}>All</button>
            {CATEGORIES.map((c) => (
              <button key={c.slug} onClick={() => setCat(c.slug)} className={"px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition " + (cat === c.slug ? "bg-foreground text-background" : "hover:text-gold")}>{c.name}</button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-xs">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="uppercase tracking-[0.18em] text-muted-foreground">Up to</span>
              <input type="range" min={500} max={15000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="accent-gold w-40" />
              <span className="font-medium tabular-nums w-20">{formatPrice(maxPrice)}</span>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-transparent border border-border px-3 py-2 text-xs uppercase tracking-[0.18em] focus:border-gold outline-none">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mb-6">{filtered.length} pieces</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
