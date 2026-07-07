import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";

const CATEGORIES = [
  { value: "all", label: "All Articles" },
  { value: "tips", label: "Baking Tips" },
  { value: "inspiration", label: "Inspiration" },
  { value: "news", label: "Bakery News" },
  { value: "recipes", label: "Recipes" },
  { value: "trends", label: "Trends" },
];

const STATIC_POSTS = [
  {
    id: 1, slug: "how-to-store-your-custom-cake",
    title: "How to Store Your Custom Cake for Maximum Freshness",
    excerpt: "Learn the best practices for storing your custom cake to keep it fresh and delicious for days after your celebration.",
    category: "tips", published: true,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    createdAt: new Date("2024-11-15"),
  },
  {
    id: 2, slug: "top-wedding-cake-trends-2025",
    title: "Top Wedding Cake Trends for 2025",
    excerpt: "From minimalist elegance to bold botanical designs, discover the wedding cake trends that are defining celebrations this year.",
    category: "trends", published: true,
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
    createdAt: new Date("2024-11-10"),
  },
  {
    id: 3, slug: "birthday-cake-ideas-for-kids",
    title: "10 Creative Birthday Cake Ideas for Kids",
    excerpt: "Make your child's birthday unforgettable with these imaginative and fun cake ideas that kids absolutely love.",
    category: "inspiration", published: true,
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
    createdAt: new Date("2024-11-05"),
  },
  {
    id: 4, slug: "aushky-pastries-new-seasonal-menu",
    title: "Introducing Our New Seasonal Menu",
    excerpt: "We're excited to unveil our new seasonal collection featuring festive flavours and limited-edition designs.",
    category: "news", published: true,
    imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&q=80",
    createdAt: new Date("2024-10-28"),
  },
  {
    id: 5, slug: "perfect-buttercream-frosting-recipe",
    title: "The Perfect Buttercream Frosting Recipe",
    excerpt: "Our signature silky-smooth buttercream frosting recipe that makes every cake taste extraordinary.",
    category: "recipes", published: true,
    imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
    createdAt: new Date("2024-10-20"),
  },
  {
    id: 6, slug: "choosing-the-right-cake-for-your-event",
    title: "How to Choose the Right Cake for Your Event",
    excerpt: "A comprehensive guide to selecting the perfect cake for weddings, birthdays, corporate events, and more.",
    category: "tips", published: true,
    imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80",
    createdAt: new Date("2024-10-15"),
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  tips: "bg-blush text-chocolate",
  inspiration: "bg-gold-light text-chocolate",
  news: "bg-cream-dark text-chocolate",
  recipes: "bg-[oklch(88%_0.05_150)] text-chocolate",
  trends: "bg-[oklch(88%_0.05_250)] text-chocolate",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: posts } = trpc.blog.list.useQuery(
    activeCategory !== "all" ? { category: activeCategory } : undefined
  );

  const displayPosts = posts && posts.length > 0 ? posts : STATIC_POSTS;
  const filtered =
    activeCategory === "all"
      ? displayPosts
      : displayPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-chocolate text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1600&q=80)" }}
        />
        <div className="container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3"
          >
            Insights & Inspiration
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
          >
            The Aushky Blog
          </motion.h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </section>

      {/* Filter */}
      <section className="bg-cream-dark py-6 sticky top-16 md:top-20 z-30 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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

      {/* Blog Grid */}
      <section className="section-padding bg-cream">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.imageUrl || ""}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] || "bg-gold-light text-chocolate"}`}>
                      {CATEGORIES.find((c) => c.value === post.category)?.label || post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.createdAt).toLocaleDateString("en-KE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag size={12} />
                        {CATEGORIES.find((c) => c.value === post.category)?.label}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg font-bold text-chocolate mb-2 leading-tight group-hover:text-warm-brown transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-warm-brown text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <button className="flex items-center gap-1.5 text-gold font-semibold text-sm hover:gap-3 transition-all duration-200">
                        Read More <ArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-warm-brown text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
