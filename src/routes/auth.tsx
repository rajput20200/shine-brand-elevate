import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign In — AURAÉ VERA" }] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => { if (user) navigate({ to: "/account" }); }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back");
      navigate({ to: "/account" });
    }
  }

  async function onGoogle() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/account" });
    if (r.error) toast.error("Google sign-in failed");
  }

  return (
    <section className="container-luxe py-16 min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="eyebrow text-gold mb-3">{mode === "signin" ? "Welcome back" : "Join the Maison"}</div>
          <h1 className="font-display text-4xl">{mode === "signin" ? "Sign in" : "Create an account"}</h1>
        </div>
        <button onClick={onGoogle} className="w-full py-3 border border-foreground hover:bg-foreground hover:text-background transition uppercase tracking-[0.18em] text-xs mb-6">
          Continue with Google
        </button>
        <div className="relative my-6"><div className="border-t border-border" /><span className="absolute inset-0 -top-2 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground"><span className="bg-background px-3">or</span></span></div>
        <form onSubmit={onSubmit} className="space-y-5">
          {mode === "signup" && (
            <div>
              <label className="eyebrow block mb-2">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-transparent border-b border-foreground py-2 outline-none focus:border-gold" />
            </div>
          )}
          <div>
            <label className="eyebrow block mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent border-b border-foreground py-2 outline-none focus:border-gold" />
          </div>
          <div>
            <label className="eyebrow block mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full bg-transparent border-b border-foreground py-2 outline-none focus:border-gold" />
          </div>
          <button disabled={loading} className="w-full py-4 bg-foreground text-background uppercase tracking-[0.22em] text-xs hover:bg-gold transition disabled:opacity-60">
            {loading ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <div className="text-center text-sm text-muted-foreground mt-6">
          {mode === "signin" ? "New to AURAÉ VERA?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-foreground gold-underline">
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </div>
      </div>
    </section>
  );
}
