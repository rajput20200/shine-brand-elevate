import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { formatPrice, getProduct } from "@/lib/products";

export function CartDrawer() {
  const { cartOpen, closeCart, cart, setQty, removeFromCart } = useStore();
  const items = cart.map((i) => ({ ...i, product: getProduct(i.id)! })).filter((i) => i.product);
  const subtotal = items.reduce((s, i) => s + (i.product.salePrice ?? i.product.price) * i.qty, 0);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/40 animate-fade-in" onClick={closeCart} />
      <aside className="absolute inset-y-0 right-0 w-full sm:w-[440px] bg-background shadow-luxe flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="font-display text-2xl">Your Bag <span className="text-muted-foreground text-base">({items.length})</span></div>
          <button onClick={closeCart} aria-label="Close" className="p-1 hover:text-gold"><X className="h-5 w-5" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-display text-2xl mb-2">Your bag is empty</p>
            <p className="text-sm text-muted-foreground mb-6">Discover something exquisite.</p>
            <Link to="/shop" onClick={closeCart} className="px-6 py-3 bg-foreground text-background uppercase tracking-[0.2em] text-xs hover:bg-gold transition">Shop All</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4">
                  <img src={i.product.images[0]} alt={i.product.name} className="h-24 w-24 object-cover bg-cream" />
                  <div className="flex-1">
                    <div className="font-display text-lg leading-tight">{i.product.name}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{i.product.subcategory}</div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="p-1.5 hover:text-gold" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="p-1.5 hover:text-gold" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="text-sm font-medium">{formatPrice((i.product.salePrice ?? i.product.price) * i.qty)}</div>
                    </div>
                    <button onClick={() => removeFromCart(i.id)} className="text-xs text-muted-foreground hover:text-foreground mt-2 underline underline-offset-2">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</div>
              <button className="w-full py-4 bg-foreground text-background uppercase tracking-[0.2em] text-xs hover:bg-gold transition">Proceed to Checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
