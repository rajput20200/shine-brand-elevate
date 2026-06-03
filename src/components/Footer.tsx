import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/products";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_signups").insert({ email });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) {
      toast.error("Could not subscribe. Try again.");
    } else {
      toast.success("Welcome to AURAÉ VERA");
      setEmail("");
    }
  }
  return (
    <footer className="bg-cream border-t border-border mt-24">
      <div className="container-luxe py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-border">
          <div>
            <div className="eyebrow mb-3">The Atelier Letter</div>
            <h3 className="font-display text-3xl md:text-4xl mb-2">Receive first looks, private previews and atelier stories.</h3>
          </div>
          <form onSubmit={subscribe} className="flex items-end gap-3">
            <div className="flex-1">
              <label className="eyebrow block mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-foreground py-2 outline-none focus:border-gold transition"
                placeholder="you@example.com"
              />
            </div>
            <button disabled={loading} className="px-6 py-2 bg-foreground text-background uppercase tracking-[0.2em] text-xs hover:bg-gold transition">
              {loading ? "…" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="font-display text-2xl tracking-[0.2em] mb-4">AURAÉ <span className="text-gold">VERA</span></div>
            <p className="text-sm text-muted-foreground max-w-xs">Heirloom-grade fine jewelry, hand-finished in our atelier and crafted to be worn for a lifetime.</p>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="Instagram" className="p-2 hover:text-gold transition"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Facebook" className="p-2 hover:text-gold transition"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <div className="eyebrow mb-4">Shop</div>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}><Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-gold transition">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">Service</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Contact</li><li>Shipping</li><li>Returns</li><li>Warranty</li><li>Care guide</li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">House</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About AURAÉ VERA</li><li>Sustainability</li><li>Press</li><li>Atelier visits</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2 pt-8 border-t border-border text-xs text-muted-foreground tracking-wider">
          <div>© {new Date().getFullYear()} AURAÉ VERA Maison. All rights reserved.</div>
          <div className="flex gap-6"><span>Privacy</span><span>Terms</span><span>Cookies</span></div>
        </div>
      </div>
    </footer>
  );
}
