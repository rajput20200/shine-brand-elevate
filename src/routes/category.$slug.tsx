import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CATEGORIES, getByCategory, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat, products: getByCategory(params.slug as CategorySlug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} — AURAÉ VERA` },
          { name: "description", content: `${loaderData.cat.name}: ${loaderData.cat.tagline}. ${loaderData.products.length} pieces from the AURAÉ VERA Maison.` },
          { property: "og:title", content: `${loaderData.cat.name} — AURAÉ VERA` },
          { property: "og:description", content: loaderData.cat.tagline },
          { property: "og:image", content: loaderData.cat.image },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <h1 className="font-display text-4xl">Category not found</h1>
      <Link to="/shop" className="text-gold underline mt-4 inline-block">View all pieces</Link>
    </div>
  ),
  errorComponent: () => <div className="container-luxe py-32 text-center"><h1 className="font-display text-4xl">Something went wrong</h1></div>,
});

function CategoryPage() {
  const { cat, products } = Route.useLoaderData();
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img src={cat.image} alt={cat.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-foreground/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-background">
          <div>
            <div className="eyebrow !text-background/80 mb-3">The Collection</div>
            <h1 className="font-display text-5xl md:text-7xl">{cat.name}</h1>
            <p className="font-display-italic text-xl md:text-2xl mt-3 opacity-90">{cat.tagline}</p>
          </div>
        </div>
      </section>
      <section className="container-luxe py-16">
        <div className="text-xs text-muted-foreground mb-6">{products.length} pieces</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
