// Client-side cart + wishlist + recently-viewed store.
// Cart stays in localStorage. Wishlist syncs to Cloud when signed in,
// falls back to localStorage when anonymous.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  qty: number;
}

interface StoreCtx {
  cart: CartItem[];
  cartCount: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;

  wishlist: Set<string>;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;

  recent: string[];
  pushRecent: (id: string) => void;

  user: { id: string; email?: string | null } | null;
  loadingAuth: boolean;
}

const Ctx = createContext<StoreCtx | null>(null);

const LS_CART = "av_cart_v1";
const LS_WISH = "av_wish_v1";
const LS_RECENT = "av_recent_v1";

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [recent, setRecent] = useState<string[]>([]);
  const [user, setUser] = useState<StoreCtx["user"]>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCart(readLS<CartItem[]>(LS_CART, []));
    setWishlist(new Set(readLS<string[]>(LS_WISH, [])));
    setRecent(readLS<string[]>(LS_RECENT, []));
  }, []);

  // Auth listener
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ? { id: data.session.user.id, email: data.session.user.email } : null);
      setLoadingAuth(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Sync wishlist when user signs in
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("wishlists").select("product_id").eq("user_id", user.id);
      if (cancelled || !data) return;
      const remote = new Set(data.map((r) => r.product_id));
      // merge local into remote
      const local = readLS<string[]>(LS_WISH, []);
      const toUpload = local.filter((id) => !remote.has(id));
      if (toUpload.length) {
        await supabase.from("wishlists").insert(toUpload.map((product_id) => ({ user_id: user.id, product_id })));
        toUpload.forEach((id) => remote.add(id));
      }
      setWishlist(remote);
    })();
    return () => { cancelled = true; };
  }, [user]);

  const persistCart = useCallback((next: CartItem[]) => { setCart(next); writeLS(LS_CART, next); }, []);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      const next = existing
        ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { id, qty }];
      writeLS(LS_CART, next);
      return next;
    });
    toast.success("Added to bag");
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => persistCart(cart.filter((i) => i.id !== id)), [cart, persistCart]);
  const setQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    persistCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
  }, [cart, persistCart, removeFromCart]);
  const clearCart = useCallback(() => persistCart([]), [persistCart]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      const adding = !next.has(id);
      if (adding) next.add(id); else next.delete(id);
      writeLS(LS_WISH, [...next]);
      if (user) {
        if (adding) {
          supabase.from("wishlists").insert({ user_id: user.id, product_id: id }).then();
        } else {
          supabase.from("wishlists").delete().eq("user_id", user.id).eq("product_id", id).then();
        }
      }
      toast(adding ? "Added to wishlist" : "Removed from wishlist");
      return next;
    });
  }, [user]);

  const isWishlisted = useCallback((id: string) => wishlist.has(id), [wishlist]);

  const pushRecent = useCallback((id: string) => {
    setRecent((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 12);
      writeLS(LS_RECENT, next);
      return next;
    });
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const value: StoreCtx = {
    cart, cartCount, cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    addToCart, removeFromCart, setQty, clearCart,
    wishlist, toggleWishlist, isWishlisted,
    recent, pushRecent,
    user, loadingAuth,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used within StoreProvider");
  return v;
}
