import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronRight, Truck, ShieldCheck, RefreshCcw, Award, Quote } from "lucide-react";
import { CATEGORIES, bestsellers, newArrivals, featured, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

import hero1 from "@/assets/hero-1.jpg";
import hero3 from "@/assets/hero-3.jpg";
import brandStory from "@/assets/brand-story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURAÉ VERA — Heirloom Fine Jewelry, Hand-Finished" },
      { name: "description", content: "Rings, necklaces, earrings, bracelets and watches crafted in our atelier. Complimentary worldwide shipping. 50,000+ customers · 4.9★ rating." },
      { property: "og:title", content: "AURAÉ VERA — Heirloom Fine Jewelry" },
      { property: "og:description", content: "Heirloom-grade fine jewelry, hand-finished in our atelier." },
    ],
  }),
  component: Home,
});

const SLIDES = [
  { img: hero1, eyebrow: "Maison Spring Collection", title: "Light that lingers", copy: "The new diamond chapter, hand-set in our atelier.", cta: "Shop New Arrivals", link: "/shop" as const },
  { img: hero3, eyebrow: "The Pearl Edit", title: "Quiet luminescence", copy: "Akoya and baroque pearls, layered as you wish.", cta: "Discover Pearls", link: "/shop" as const },
];

function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={"absolute inset-0 transition-opacity duration-1000 " + (i === slide ? "opacity-100" : "opacity-0 pointer-events-none")}
          >
            <img src={s.img} alt="" className="h-full w-full object-cover" fetchPriority={i === 0 ? "high" : "auto"} />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/15 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-luxe">
                <div className="max-w-xl text-background">
                  <div className="eyebrow !text-background/80 mb-4">{s.eyebrow}</div>
                  <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">{s.title}</h1>
                  <p className="text-base md:text-lg opacity-90 mb-8 max-w-md">{s.copy}</p>
                  <Link to={s.link} className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground uppercase tracking-[0.22em] text-xs hover:bg-gold hover:text-gold-foreground transition">
                    {s.cta} <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} className={"h-0.5 transition-all " + (i === slide ? "w-12 bg-background" : "w-6 bg-background/40")} />
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-cream">
        <div className="container-luxe grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { Icon: Truck, label: "Complimentary worldwide shipping" },
            { Icon: ShieldCheck, label: "Lifetime warranty" },
            { Icon: RefreshCcw, label: "30-day easy returns" },
            { Icon: Award, label: "50,000+ customers · 4.9★" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-5 text-xs md:text-sm">
              <Icon className="h-5 w-5 text-gold flex-shrink-0" />
              <span className="leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-luxe py-20">
        <div className="text-center mb-12">
          <div className="eyebrow text-gold mb-3">Explore the Maison</div>
          <h2 className="font-display text-4xl md:text-5xl">Five families. One handwriting.</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-5">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-background">
                  <div className="font-display text-2xl md:text-3xl">{c.name}</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80 mt-1">{c.tagline}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductRow title="Best Sellers" eyebrow="Loved by 50,000+ customers" items={bestsellers().slice(0, 8)} />
      <ProductRow title="New Arrivals" eyebrow="Just from the atelier" items={newArrivals().slice(0, 8)} dark />
      <ProductRow title="The Featured Edit" eyebrow="Hand-chosen by our curators" items={featured().slice(0, 8)} />

      {/* BRAND STORY */}
      <section className="container-luxe py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] overflow-hidden bg-cream order-2 md:order-1">
          <img src={brandStory} alt="Master jeweler at work" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="order-1 md:order-2 md:pl-8">
          <div className="eyebrow text-gold mb-3">The Atelier</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">Crafted by hand. Worn for a lifetime.</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Every AURAÉ VERA piece begins on a master jeweler's bench — a slow dialogue between stone, metal and intention. We use only recycled precious metals and ethically-traced stones.</p>
          <p className="text-muted-foreground leading-relaxed mb-8">From the first sketch to the final polish, a single piece can take up to forty hours.</p>
          <Link to="/shop" className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background uppercase tracking-[0.22em] text-xs hover:bg-gold transition">
            Discover the Collection <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream py-24">
        <div className="container-luxe">
          <div className="text-center mb-12">
            <div className="eyebrow text-gold mb-3">In their words</div>
            <h2 className="font-display text-4xl md:text-5xl">A house held close.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "The most exquisite engagement ring I have ever seen. The craftsmanship is breathtaking.", a: "Isabelle R." },
              { q: "From the packaging to the polish, every detail whispers luxury. A new forever favorite.", a: "Priya K." },
              { q: "I bought the tennis bracelet for my mother. She cried. So did I.", a: "Sophia M." },
            ].map((t) => (
              <div key={t.a} className="bg-background p-8 shadow-card">
                <Quote className="h-6 w-6 text-gold mb-4" />
                <p className="font-display text-xl leading-snug mb-6">"{t.q}"</p>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container-luxe py-20">
        <div className="text-center mb-10">
          <div className="eyebrow text-gold mb-3">@auraevera</div>
          <h2 className="font-display text-3xl md:text-4xl">Worn around the world</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
          {PRODUCTS.slice(0, 12).map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="group relative aspect-square overflow-hidden bg-cream">
              <img src={p.images[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ProductRow({ title, eyebrow, items, dark }: { title: string; eyebrow: string; items: any[]; dark?: boolean }) {
  return (
    <section className={dark ? "bg-cream py-20" : "py-20"}>
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow text-gold mb-2">{eyebrow}</div>
            <h2 className="font-display text-3xl md:text-5xl">{title}</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] gold-underline">View All <ChevronRight className="h-3 w-3" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
