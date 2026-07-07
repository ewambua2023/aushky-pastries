import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const STATIC_TESTIMONIALS = [
  { id: 1, customerName: "Amina Wanjiku", occasion: "Wedding", rating: 5, review: "Aushky Pastries made our wedding day absolutely perfect. The cake was not only stunning but tasted divine. Every guest was asking where we got it from! The attention to detail was extraordinary.", customerPhoto: null },
  { id: 2, customerName: "David Ochieng", occasion: "Birthday", rating: 5, review: "I ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible and the flavor was out of this world. Will definitely order again!", customerPhoto: null },
  { id: 3, customerName: "Grace Muthoni", occasion: "Baby Shower", rating: 5, review: "The team at Aushky Pastries went above and beyond. Our baby shower cake was a masterpiece — beautifully designed and absolutely delicious. All our guests were impressed.", customerPhoto: null },
  { id: 4, customerName: "James Kamau", occasion: "Corporate Event", rating: 5, review: "We ordered a corporate cake for our company anniversary and it was perfect. Professional, beautifully branded, and tasted amazing. Our team loved it!", customerPhoto: null },
  { id: 5, customerName: "Fatuma Hassan", occasion: "Graduation", rating: 5, review: "The graduation cake was beyond beautiful. The gold detailing matched our theme perfectly and the red velvet inside was absolutely divine. Thank you Aushky!", customerPhoto: null },
  { id: 6, customerName: "Peter Njoroge", occasion: "Wedding Anniversary", rating: 5, review: "For our 10th anniversary, we wanted something truly special. Aushky delivered a stunning cake that brought tears to my wife's eyes. The craftsmanship is unmatched.", customerPhoto: null },
  { id: 7, customerName: "Cynthia Akinyi", occasion: "Kids Birthday", rating: 5, review: "My son's unicorn cake was absolutely magical! He was so excited and all his friends were amazed. The cake was as delicious as it was beautiful.", customerPhoto: null },
  { id: 8, customerName: "Samuel Mwangi", occasion: "Church Event", rating: 4, review: "Ordered 3 cakes for our church fundraiser and they were all perfect. Great quality, great taste, and delivered on time. Highly recommend!", customerPhoto: null },
  { id: 9, customerName: "Lucy Wambui", occasion: "Bridal Shower", rating: 5, review: "The bridal shower cake was stunning — exactly what we envisioned. The team was so easy to work with and the result was absolutely gorgeous.", customerPhoto: null },
];

export default function Testimonials() {
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : STATIC_TESTIMONIALS;

  const avgRating = displayTestimonials.reduce((sum, t) => sum + t.rating, 0) / displayTestimonials.length;

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
            Happy Customers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Testimonials
          </motion.h1>
          <div className="gold-divider w-24 mx-auto mb-8" />
          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white font-serif text-2xl font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-white/60 text-sm">({displayTestimonials.length} reviews)</span>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Quote icon */}
                <Quote size={32} className="text-gold-light mb-4" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={15}
                      className={j < t.rating ? "fill-gold text-gold" : "fill-muted text-muted"}
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-warm-brown text-sm leading-relaxed mb-6 italic flex-1">
                  "{t.review}"
                </p>

                {/* Customer */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={
                      t.customerPhoto ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(t.customerName)}&background=b8860b&color=fff&size=48`
                    }
                    alt={t.customerName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gold-light"
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-dark text-center">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-chocolate mb-4">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-warm-brown mb-8 max-w-xl mx-auto">
            Join hundreds of happy customers. Order your custom cake today.
          </p>
          <Link href="/custom-cake">
            <button className="px-8 py-4 rounded-full gold-gradient text-white font-semibold hover:shadow-lg transition-all duration-200">
              Order Your Cake
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
