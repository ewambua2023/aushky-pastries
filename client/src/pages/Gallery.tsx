import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday" },
  { value: "kids", label: "Kids" },
  { value: "corporate", label: "Corporate" },
  { value: "cupcakes", label: "Cupcakes" },
  { value: "desserts", label: "Desserts" },
];

const STATIC_GALLERY = [
  { id: 1, imageUrl: "/manus-storage/user-photo-1_0ba45c18.jpg", title: "3-Tier Butterfly Wedding Cake", category: "wedding" },
  { id: 2, imageUrl: "/manus-storage/user-photo-3_3e21cd14.jpg", title: "Birthday Celebration Cake", category: "birthday" },
  { id: 3, imageUrl: "/manus-storage/user-photo-4_038d6f84.jpg", title: "Elegant Cake Design", category: "wedding" },
  { id: 4, imageUrl: "/manus-storage/user-photo-6_af74a89d.jpg", title: "Custom Cake Creation", category: "birthday" },
  { id: 5, imageUrl: "/manus-storage/user-photo-7_b340341b.jpg", title: "Artisan Cake", category: "wedding" },
  { id: 6, imageUrl: "/manus-storage/user-photo-8_6193ecb8.jpg", title: "Celebration Masterpiece", category: "birthday" },
  { id: 7, imageUrl: "/manus-storage/user-photo-9_29144c74.jpg", title: "Premium Cake Design", category: "cupcakes" },
  { id: 8, imageUrl: "/manus-storage/user-photo-10_c0727c40.jpg", title: "Special Occasion Cake", category: "corporate" },
  { id: 9, imageUrl: "/manus-storage/user-photo-11_71707762.jpg", title: "Elegant Dessert", category: "desserts" },
  { id: 10, imageUrl: "/manus-storage/user-photo-12_eff279be.jpg", title: "Gourmet Creation", category: "birthday" },
  { id: 11, imageUrl: "/manus-storage/user-photo-13_c2f3b1e8.jpg", title: "Artisan Pastry", category: "desserts" },
  { id: 12, imageUrl: "/manus-storage/user-photo-14_720525c4.jpg", title: "Premium Dessert", category: "desserts" },
  { id: 13, imageUrl: "/manus-storage/user-photo-15_60882e78.jpg", title: "Corporate Event Cake", category: "corporate" },
  { id: 14, imageUrl: "/manus-storage/user-photo-16_4852c835.jpg", title: "Kids Party Cake", category: "kids" },
  { id: 15, imageUrl: "/manus-storage/user-photo-17_3d3e53b7.jpg", title: "Wedding Masterpiece", category: "wedding" },
  { id: 16, imageUrl: "/manus-storage/user-photo-18_d1a73196.jpg", title: "Birthday Delight", category: "birthday" },
  { id: 17, imageUrl: "/manus-storage/user-photo-19_0a3a548b.jpg", title: "Cupcake Collection", category: "cupcakes" },
  { id: 18, imageUrl: "/manus-storage/user-photo-20_be2160ad.jpg", title: "Seasonal Special", category: "desserts" },
  { id: 19, imageUrl: "/manus-storage/user-photo-22_837a94d9.jpg", title: "Premium Creation", category: "wedding" },
  { id: 20, imageUrl: "/manus-storage/user-photo-23_44d8aad9.jpg", title: "Gourmet Dessert", category: "desserts" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: galleryItems } = trpc.gallery.list.useQuery(
    activeCategory !== "all" ? { category: activeCategory } : undefined
  );

  const displayItems = galleryItems && galleryItems.length > 0 ? galleryItems : STATIC_GALLERY;
  const filtered =
    activeCategory === "all"
      ? displayItems
      : displayItems.filter((item) => item.category === activeCategory);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-chocolate text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1600&q=80)" }}
        />
        <div className="container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3"
          >
            Our Creations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Gallery
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

      {/* Gallery Grid */}
      <section className="section-padding bg-cream">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group break-inside-avoid rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Gallery item"}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      {item.title && (
                        <p className="text-white font-serif font-semibold text-sm">{item.title}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-warm-brown text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
