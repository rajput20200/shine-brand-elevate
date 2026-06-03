import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow text-gold mb-3">404</div>
        <h1 className="font-display text-5xl">Lost in the atelier</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you're looking for has moved or no longer exists.</p>
        <a href="/" className="mt-8 inline-block px-6 py-3 bg-foreground text-background uppercase tracking-[0.2em] text-xs hover:bg-gold transition">Return Home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went amiss</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try refreshing, or return to the home page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-5 py-2.5 bg-foreground text-background uppercase tracking-[0.2em] text-xs hover:bg-gold transition">Try again</button>
          <a href="/" className="px-5 py-2.5 border border-foreground uppercase tracking-[0.2em] text-xs hover:bg-foreground hover:text-background transition">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AURAÉ VERA — Heirloom Fine Jewelry" },
      { name: "description", content: "AURAÉ VERA crafts heirloom-grade rings, necklaces, earrings, bracelets and watches in our atelier. Complimentary worldwide shipping." },
      { name: "author", content: "AURAÉ VERA Maison" },
      { property: "og:title", content: "AURAÉ VERA — Heirloom Fine Jewelry" },
      { property: "og:description", content: "AURAÉ VERA crafts heirloom-grade rings, necklaces, earrings, bracelets and watches in our atelier. Complimentary worldwide shipping." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AURAÉ VERA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AURAÉ VERA — Heirloom Fine Jewelry" },
      { name: "twitter:description", content: "AURAÉ VERA crafts heirloom-grade rings, necklaces, earrings, bracelets and watches in our atelier. Complimentary worldwide shipping." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/858b12a0-2ca5-4abc-9a64-186d60c2819e/id-preview-6ffb315c--f7ba1c97-260e-4fd8-a33f-e4c265d158ab.lovable.app-1780516521485.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/858b12a0-2ca5-4abc-9a64-186d60c2819e/id-preview-6ffb315c--f7ba1c97-260e-4fd8-a33f-e4c265d158ab.lovable.app-1780516521485.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(() => { router.invalidate(); });
    return () => sub.subscription.unsubscribe();
  }, [router]);
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <CartDrawer />
        <Toaster />
      </StoreProvider>
    </QueryClientProvider>
  );
}
