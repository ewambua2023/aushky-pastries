import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Award, Heart, Truck, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const CATEGORY_LABELS: Record<string, string> = {
  birthday_cakes: "Birthday Cakes",
  wedding_cakes: "Wedding Cakes",
  kids_cakes: "Kids Cakes",
  cupcakes: "Cupcakes",
  cookies: "Cookies",
  pastries: "Pastries",
  desserts: "Desserts",
  corporate_cakes: "Corporate Cakes",
  seasonal_specials: "Seasonal Specials",
};

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

const DEFAULT_CAKE_IMG = "/manus-storage/butterfly-cake-enhanced_ea1ab931.png";

const STATIC_FEATURED = [
  {
    id: 1,
    name: "Elegant Butterfly Cake",
    category: "wedding_cakes",
    startingPrice: "8500",
    description: "Multi-tiered masterpiece adorned with blue butterflies and gold leaf accents.",
    imageUrl: "/manus-storage/butterfly-cake-enhanced_ea1ab931.png",
  },
  {
    id: 2,
    name: "Purple & Gold Celebration Cake",
    category: "birthday_cakes",
    startingPrice: "3500",
    description: "Vibrant purple gradient with gold leaf decorations and elegant flowers.",
    imageUrl: "/manus-storage/purple-gold-cake-enhanced_e21338a9.png",
  },
  {
    id: 3,
    name: "Artisan Cupcake Box",
    category: "cupcakes",
    startingPrice: "1200",
    description: "A dozen handcrafted cupcakes with signature buttercream swirls.",
    imageUrl: "/manus-storage/bakery-display-enhanced_d3f41d0d.png",
  },
  {
    id: 4,
    name: "Premium Fruit Cake",
    category: "kids_cakes",
    startingPrice: "4200",
    description: "Rich, moist fruit cake loaded with dried fruits and nuts.",
    imageUrl: "/manus-storage/fruitcake-slice-enhanced_5fbd6524.png",
  },
  {
    id: 5,
    name: "Custom Wedding Cake",
    category: "wedding_cakes",
    startingPrice: "9500",
    description: "Elegant multi-tier wedding cake with custom decorations.",
    imageUrl: "/manus-storage/user-photo-1_0ba45c18.jpg",
  },
  {
    id: 6,
    name: "Celebration Cake Collection",
    category: "birthday_cakes",
    startingPrice: "3800",
    description: "Beautifully designed cakes for all your special occasions.",
    imageUrl: "/manus-storage/user-photo-3_3e21cd14.jpg",
  },
];

const STATIC_TESTIMONIALS = [
  {
    id: 1,
    customerName: "Amina Wanjiku",
    occasion: "Wedding",
    rating: 5,
    review: "Aushky Pastries made our wedding day absolutely perfect. The cake was not only stunning but tasted divine. Every guest was asking where we got it from!",
    customerPhoto: null,
  },
  {
    id: 2,
    customerName: "David Ochieng",
    occasion: "Birthday",
    rating: 5,
    review: "I ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible and the flavor was out of this world.",
    customerPhoto: null,
  },
  {
    id: 3,
    customerName: "Grace Muthoni",
    occasion: "Baby Shower",
    rating: 5,
    review: "The team at Aushky Pastries went above and beyond. Our baby shower cake was a masterpiece — beautifully designed and absolutely delicious.",
    customerPhoto: null,
  },
];

export default function Home() {
  const { data: featuredProducts } = trpc.products.featured.useQuery();
  const { data: featuredTestimonials } = trpc.testimonials.featured.useQuery();

  const displayProducts =
    featuredProducts && featuredProducts.length > 0 ? featuredProducts : STATIC_FEATURED;
  const displayTestimonials =
    featuredTestimonials && featuredTestimonials.length > 0
      ? featuredTestimonials
      : STATIC_TESTIMONIALS;

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(22% 0.06 42) 0%, oklch(28% 0.07 44) 50%, oklch(18% 0.05 38) 100%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url(/manus-storage/user-photo-5_344fe37b.jpg)`,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(22%_0.06_42/0.4)] to-[oklch(22%_0.06_42/0.8)]" />

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[oklch(72%_0.12_75/0.06)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-[oklch(72%_0.12_75/0.04)] blur-2xl pointer-events-none" />

        <div className="container relative z-10 text-center pt-24 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-4"
            >
              Artisan Bakery · Nairobi, Kenya
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
            >
              Every Celebration
              <br />
              <span className="text-gold italic">Deserves a</span>
              <br />
              Beautiful Cake
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Handcrafted custom cakes, pastries, and desserts baked with love for your most
              cherished moments. Premium quality, unforgettable taste.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/custom-cake">
                <button className="px-8 py-4 rounded-full gold-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
                  Order Your Cake Today
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/products">
                <button className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-all duration-200 flex items-center gap-2">
                  View Our Products
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-chocolate py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Happy Customers" },
              { value: "1,200+", label: "Cakes Delivered" },
              { value: "50+", label: "Cake Designs" },
              { value: "5★", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <p className="font-serif text-3xl font-bold text-gold">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section-padding bg-cream">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-2">
              Our Creations
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-chocolate mb-4">
              Featured Cakes & Treats
            </h2>
            <div className="gold-divider w-24 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      product.imageUrl ||
                      PLACEHOLDER_IMAGES[(product.category as string)] ||
                      DEFAULT_CAKE_IMG
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {CATEGORY_LABELS[product.category as string] || product.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-chocolate mb-1">
                    {product.name}
                  </h3>
                  <p className="text-warm-brown text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-bold text-lg">
                      From KES {Number(product.startingPrice).toLocaleString()}
                    </span>
                    <Link href="/custom-cake">
                      <button className="px-4 py-2 rounded-full bg-chocolate text-white text-xs font-semibold hover:bg-warm-brown transition-colors">
                        Order Now
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <button className="px-8 py-3.5 rounded-full border-2 border-chocolate text-chocolate font-semibold hover:bg-chocolate hover:text-white transition-all duration-200 flex items-center gap-2 mx-auto">
                View All Products
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section-padding bg-cream-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                  alt="Baker at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 card-shadow">
                <p className="font-serif text-3xl font-bold text-gold">10+</p>
                <p className="text-chocolate text-sm font-medium">Years of Craft</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-chocolate mb-6 leading-tight">
                Baked with Love,
                <br />
                <span className="text-warm-brown italic">Crafted with Passion</span>
              </h2>
              <div className="gold-divider w-16 mb-6" />
              <p className="text-warm-brown text-base leading-relaxed mb-5">
                Aushky Pastries was born from a deep love of baking and a desire to bring joy to
                every celebration. Founded in the heart of Nairobi, we specialize in creating
                bespoke cakes and pastries that tell your unique story.
              </p>
              <p className="text-warm-brown text-base leading-relaxed mb-8">
                Every cake we create is a labour of love — from the first consultation to the
                final decoration. We use only the finest ingredients, ensuring that each bite is
                as memorable as the occasion it celebrates.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Award, label: "Premium Quality" },
                  { icon: Heart, label: "Made with Love" },
                  { icon: Star, label: "5-Star Reviews" },
                  { icon: Truck, label: "Nairobi Delivery" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold-light flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gold-dark" />
                    </div>
                    <span className="text-chocolate text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <button className="px-7 py-3.5 rounded-full gold-gradient text-white font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                  Our Full Story
                  <ArrowRight size={16} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding bg-chocolate text-white">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-2">
              Why Aushky
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              The Aushky Difference
            </h2>
            <div className="gold-divider w-24 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎂",
                title: "100% Custom",
                desc: "Every cake is uniquely designed to match your vision, theme, and taste preferences.",
              },
              {
                icon: "🌿",
                title: "Fresh Ingredients",
                desc: "We source only the finest, freshest ingredients to ensure superior taste and quality.",
              },
              {
                icon: "✨",
                title: "Artisan Craftsmanship",
                desc: "Each creation is handcrafted with meticulous attention to detail and artistic flair.",
              },
              {
                icon: "🚚",
                title: "Reliable Delivery",
                desc: "Timely, careful delivery across Nairobi to ensure your cake arrives perfectly.",
              },
              {
                icon: "💬",
                title: "Personal Consultation",
                desc: "We work closely with you to bring your dream cake to life, every step of the way.",
              },
              {
                icon: "⭐",
                title: "Satisfaction Guaranteed",
                desc: "Your happiness is our priority. We're not done until you're absolutely delighted.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white/5 rounded-2xl p-7 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS TEASER ── */}
      <section className="section-padding bg-cream">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-2">
              Happy Customers
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-chocolate mb-4">
              What Our Clients Say
            </h2>
            <div className="gold-divider w-24 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 card-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-warm-brown text-sm leading-relaxed mb-5 italic">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      t.customerPhoto ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(t.customerName)}&background=b8860b&color=fff&size=48`
                    }
                    alt={t.customerName}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-chocolate text-sm">{t.customerName}</p>
                    {t.occasion && (
                      <p className="text-gold text-xs">{t.occasion}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/testimonials">
              <button className="px-7 py-3 rounded-full border-2 border-chocolate text-chocolate font-semibold hover:bg-chocolate hover:text-white transition-all duration-200 flex items-center gap-2 mx-auto">
                Read All Reviews
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-[oklch(22%_0.06_42/0.85)]" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3">
              Ready to Order?
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl font-bold text-white mb-5">
              Let's Create Your
              <br />
              <span className="text-gold italic">Dream Cake</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Use our Custom Cake Builder to design your perfect cake and get an instant price
              estimate. We'll be in touch within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/custom-cake">
                <button className="px-8 py-4 rounded-full gold-gradient text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
                  Build Your Cake
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition-all duration-200">
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
