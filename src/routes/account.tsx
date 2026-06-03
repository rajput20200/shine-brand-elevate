import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — AURAÉ VERA" }] }),
  component: Account,
});

function Account() {
  const { user, loadingAuth, wishlist, recent } = useStore();
  const navigate = useNavigate();
  useEffect(() => { if (!loadingAuth && !user) navigate({ to: "/auth" }); }, [user, loadingAuth, navigate]);

  if (loadingAuth || !user) return <div className="container-luxe py-32 text-center text-muted-foreground">Loading…</div>;

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  }

  return (
    <section className="container-luxe py-16 min-h-[60vh]">
      <div className="mb-12">
        <div className="eyebrow text-gold mb-2">Your account</div>
        <h1 className="font-display text-5xl">Welcome back</h1>
        <p className="text-muted-foreground mt-2">{user.email}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-cream p-8">
          <div className="eyebrow mb-2">Wishlist</div>
          <div className="font-display text-4xl">{wishlist.size}</div>
          <Link to="/wishlist" className="text-xs uppercase tracking-[0.2em] gold-underline mt-4 inline-block">View saved</Link>
        </div>
        <div className="bg-cream p-8">
          <div className="eyebrow mb-2">Recently viewed</div>
          <div className="font-display text-4xl">{recent.length}</div>
        </div>
        <div className="bg-cream p-8">
          <div className="eyebrow mb-2">Orders</div>
          <div className="font-display text-4xl">0</div>
          <div className="text-xs text-muted-foreground mt-2">No orders yet</div>
        </div>
      </div>
      <button onClick={signOut} className="mt-12 px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition uppercase tracking-[0.2em] text-xs">Sign Out</button>
    </section>
  );
}
