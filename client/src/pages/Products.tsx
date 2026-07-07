import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ShoppingBag, Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";

const CATEGORIES = [
  { value: "all", label: "All Products" },
  { value: "birthday_cakes", label: "Birthday Cakes" },
  { value: "wedding_cakes", label: "Wedding Cakes" },
  { value: "kids_cakes", label: "Kids Cakes" },
  { value: "cupcakes", label: "Cupcakes" },
  { value: "cookies", label: "Cookies" },
  { value: "pastries", label: "Pastries" },
  { value: "desserts", label: "Desserts" },
  { value: "corporate_cakes", label: "Corporate Cakes" },
  { value: "seasonal_specials", label: "Seasonal Specials" },
];

const PLACEHOLDER_IMAGES: Record<string, string> = {
  birthday_cakes: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  wedding_cakes: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
  kids_cakes: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
  cupcakes: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
  cookies: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
  pastries: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
  desserts: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
  corporate_cakes: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80",
  seasonal_specials: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&q=80",
};

const STATIC_PRODUCTS = [
  { id: 1, name: "Classic Birthday Cake", category: "birthday_cakes", startingPrice: "3500", description: "A timeless celebration cake with layers of vanilla sponge and buttercream frosting, customized with your message.", imageUrl: PLACEHOLDER_IMAGES.birthday_cakes, available: true, featured: true },
  { id: 2, name: "Elegant Wedding Tier Cake", category: "wedding_cakes", startingPrice: "8500", description: "Multi-tiered masterpiece adorned with fresh florals and gold leaf accents. Perfect for your special day.", imageUrl: PLACEHOLDER_IMAGES.wedding_cakes, available: true, featured: true },
  { id: 3, name: "Kids Fantasy Cake", category: "kids_cakes", startingPrice: "4200", description: "Whimsical themed cakes bringing children's imaginations to life — from unicorns to superheroes.", imageUrl: PLACEHOLDER_IMAGES.kids_cakes, available: true, featured: false },
  { id: 4, name: "Artisan Cupcake Box (12)", category: "cupcakes", startingPrice: "1200", description: "A dozen handcrafted cupcakes with signature buttercream swirls and seasonal toppings.", imageUrl: PLACEHOLDER_IMAGES.cupcakes, available: true, featured: true },
  { id: 5, name: "Gourmet Cookie Box", category: "cookies", startingPrice: "800", description: "Assorted premium cookies — chocolate chip, shortbread, and oatmeal raisin — baked fresh daily.", imageUrl: PLACEHOLDER_IMAGES.cookies, available: true, featured: false },
  { id: 6, name: "Flaky Croissant Selection", category: "pastries", startingPrice: "600", description: "Buttery, golden croissants and Danish pastries baked fresh every morning.", imageUrl: PLACEHOLDER_IMAGES.pastries, available: true, featured: false },
  { id: 7, name: "Chocolate Lava Dessert", category: "desserts", startingPrice: "450", description: "Warm chocolate lava cake with a molten centre, served with vanilla ice cream.", imageUrl: PLACEHOLDER_IMAGES.desserts, available: true, featured: false },
  { id: 8, name: "Corporate Branded Cake", category: "corporate_cakes", startingPrice: "6000", description: "Professional branded cakes for company events, product launches, and corporate milestones.", imageUrl: PLACEHOLDER_IMAGES.corporate_cakes, available: true, featured: true },
  { id: 9, name: "Christmas Fruit Cake", category: "seasonal_specials", startingPrice: "3200", description: "Rich, moist fruit cake with festive decorations — a holiday tradition.", imageUrl: PLACEHOLDER_IMAGES.seasonal_specials, available: true, featured: false },
  { id: 10, name: "Chocolate Drip Cake", category: "birthday_cakes", startingPrice: "4500", description: "Decadent chocolate sponge with ganache drip, fresh berries, and gold dust.", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", available: true, featured: false },
  { id: 11, name: "Floral Garden Cake", category: "wedding_cakes", startingPrice: "12000", description: "A botanical masterpiece covered in hand-piped sugar flowers and fresh greenery.", imageUrl: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80", available: true, featured: false },
  { id: 12, name: "Red Velvet Cupcakes (6)", category: "cupcakes", startingPrice: "700", description: "Classic red velvet cupcakes with cream cheese frosting and a dusting of red crumbs.", imageUrl: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=80", available: true, featured: false },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: products } = trpc.products.list.useQuery(
    activeCategory !== "all" ? { category: activeCategory } : undefined
  );

  const displayProducts = products && products.length > 0 ? products : STATIC_PRODUCTS;
  const filtered =
    activeCategory === "all"
      ? displayProducts
      : displayProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-chocolate text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80)" }}
        />
        <div className="container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3"
          >
            Our Menu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Our Products
          </motion.h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </section>

      {/* Filter */}
      <section className="bg-cream-dark py-6 sticky top-16 md:top-20 z-30 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter size={16} className="text-gold shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "gold-gradient text-white shadow-md"
                    : "bg-white text-chocolate hover:bg-gold-light border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-cream">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={product.imageUrl || PLACEHOLDER_IMAGES[product.category as string] || ""}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-gold text-xs font-medium uppercase tracking-wider mb-1">
                      {CATEGORIES.find((c) => c.value === product.category)?.label || product.category}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-chocolate mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-warm-brown text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Starting from</p>
                        <p className="text-gold font-bold text-lg">
                          KES {Number(product.startingPrice).toLocaleString()}
                        </p>
                      </div>
                      <Link href="/custom-cake">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-chocolate text-white text-xs font-semibold hover:bg-warm-brown transition-colors">
                          <ShoppingBag size={13} />
                          Order
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-warm-brown text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-chocolate text-white text-center">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Use our Custom Cake Builder to design exactly what you have in mind.
          </p>
          <Link href="/custom-cake">
            <button className="px-8 py-4 rounded-full gold-gradient text-white font-semibold hover:shadow-lg transition-all duration-200">
              Build a Custom Cake
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
