import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — AURAÉ VERA" }, { name: "description", content: "Pieces you've saved." }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const items = [...wishlist].map((id) => getProduct(id)).filter(Boolean);
  return (
    <section className="container-luxe py-16 min-h-[60vh]">
      <div className="text-center mb-12">
        <Heart className="h-8 w-8 text-gold mx-auto mb-3" />
        <h1 className="font-display text-5xl">Your Wishlist</h1>
        <p className="text-muted-foreground mt-2">{items.length} {items.length === 1 ? "piece" : "pieces"} saved</p>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-6">You haven't saved any pieces yet.</p>
          <Link to="/shop" className="px-8 py-4 bg-foreground text-background uppercase tracking-[0.22em] text-xs hover:bg-gold transition">Discover the Collection</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {items.map((p) => <ProductCard key={p!.id} product={p!} />)}
        </div>
      )}
    </section>
  );
}
