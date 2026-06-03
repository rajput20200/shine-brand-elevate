import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { CATEGORIES, searchProducts, formatPrice, type Product } from "@/lib/products";

export function Header() {
  const { cartCount, openCart, wishlist, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden md:flex items-center justify-center py-2 bg-foreground text-background eyebrow">
        Complimentary insured worldwide shipping · 1-year warranty · Easy returns
      </div>
      <header
        className={
          "sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md " +
          (scrolled ? "bg-background/90 border-b border-border" : "bg-background/60")
        }
      >
        <div className="container-luxe flex items-center justify-between h-16 md:h-20">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="font-display text-2xl md:text-3xl tracking-[0.18em] md:tracking-[0.22em]">
            AURAÉ<span className="text-gold"> VERA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wider uppercase">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="gold-underline py-1"
                activeProps={{ className: "text-gold" }}
              >
                {c.name}
              </Link>
            ))}
            <Link to="/shop" className="gold-underline py-1">Shop All</Link>
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-2 hover:text-gold transition">
              <Search className="h-5 w-5" />
            </button>
            <Link to={user ? "/account" : "/auth"} aria-label="Account" className="hidden md:inline-flex p-2 hover:text-gold transition">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 hover:text-gold transition">
              <Heart className="h-5 w-5" />
              {wishlist.size > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">{wishlist.size}</span>
              )}
            </Link>
            <button onClick={openCart} aria-label="Bag" className="relative p-2 hover:text-gold transition">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();
  useEffect(() => { setResults(searchProducts(q)); }, [q]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl animate-fade-in" onClick={onClose}>
      <div className="container-luxe pt-24" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search rings, necklaces, diamonds…"
            className="flex-1 bg-transparent outline-none font-display text-2xl md:text-4xl placeholder:text-muted-foreground/50"
          />
          <button onClick={onClose} aria-label="Close" className="p-2"><X className="h-5 w-5" /></button>
        </div>
        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => { onClose(); navigate({ to: "/product/$id", params: { id: p.id } }); }}
                className="flex items-center gap-4 p-3 hover:bg-cream text-left transition"
              >
                <img src={p.images[0]} alt={p.name} className="h-16 w-16 object-cover rounded-sm" loading="lazy" />
                <div className="flex-1">
                  <div className="font-display text-lg">{p.name}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{p.subcategory}</div>
                </div>
                <div className="font-medium">{formatPrice(p.salePrice ?? p.price)}</div>
              </button>
            ))}
          </div>
        )}
        {q && results.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">No pieces match "{q}"</div>
        )}
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-background p-6 animate-slide-in-right" style={{ animationDirection: "reverse" }}>
        <div className="flex items-center justify-between mb-8">
          <span className="font-display text-xl tracking-[0.2em]">AURAÉ <span className="text-gold">VERA</span></span>
          <button onClick={onClose} aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex flex-col gap-1">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} onClick={onClose} className="font-display text-2xl py-3 border-b border-border">{c.name}</Link>
          ))}
          <Link to="/shop" onClick={onClose} className="font-display text-2xl py-3 border-b border-border">Shop All</Link>
          <Link to="/wishlist" onClick={onClose} className="font-display text-2xl py-3 border-b border-border">Wishlist</Link>
          <Link to="/account" onClick={onClose} className="font-display text-2xl py-3 border-b border-border">Account</Link>
        </nav>
      </div>
    </div>
  );
}
