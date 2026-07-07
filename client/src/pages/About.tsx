import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Award, Users, Leaf } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function About() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-chocolate text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/manus-storage/user-photo-2_4bd9f3c5.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-chocolate/80" />
        <div className="container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-5"
          >
            About Aushky Pastries
          </motion.h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3">Our Beginning</p>
              <h2 className="font-serif text-4xl font-bold text-chocolate mb-5 leading-tight">
                A Story Born from <span className="italic text-warm-brown">Passion</span>
              </h2>
              <div className="gold-divider w-16 mb-6" />
              <p className="text-warm-brown text-base leading-relaxed mb-4">
                Aushky Pastries was founded with a simple but powerful belief: that every celebration deserves a cake as extraordinary as the moment itself. What began as a passion project in a home kitchen has grown into one of Nairobi's most beloved artisan bakeries.
              </p>
              <p className="text-warm-brown text-base leading-relaxed mb-4">
                Our founder, driven by a lifelong love of baking and an eye for beauty, spent years perfecting recipes and techniques — studying the art of cake design, experimenting with flavours, and learning the science behind the perfect bake.
              </p>
              <p className="text-warm-brown text-base leading-relaxed">
                Today, Aushky Pastries is a name synonymous with quality, creativity, and heartfelt craftsmanship. Every cake we create carries the same love and dedication that sparked our very first bake.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="/manus-storage/user-photo-5_344fe37b.jpg"
                  alt="Baker at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 card-shadow">
                <p className="font-serif text-3xl font-bold text-gold">10+</p>
                <p className="text-chocolate text-sm font-medium">Years of Craft</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-cream-dark">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-2">What Drives Us</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-chocolate mb-4">
              Mission, Vision & Values
            </h2>
            <div className="gold-divider w-24 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Our Mission",
                color: "bg-blush",
                text: "To create extraordinary baked goods that bring joy, mark milestones, and make every celebration unforgettable — one cake at a time.",
              },
              {
                icon: Award,
                title: "Our Vision",
                color: "bg-gold-light",
                text: "To be Kenya's most trusted and celebrated artisan bakery, known for uncompromising quality, creative excellence, and genuine customer care.",
              },
              {
                icon: Leaf,
                title: "Our Values",
                color: "bg-cream",
                text: "Quality without compromise. Creativity without limits. Care for every customer. Freshness in every bite. Pride in every creation.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 card-shadow text-center"
              >
                <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-5`}>
                  <item.icon size={28} className="text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-chocolate mb-4">{item.title}</h3>
                <div className="gold-divider w-12 mx-auto mb-4" />
                <p className="text-warm-brown text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Baker */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3">The Artisan</p>
              <h2 className="font-serif text-4xl font-bold text-chocolate mb-5 leading-tight">
                Meet the Baker <span className="italic text-warm-brown">Behind the Magic</span>
              </h2>
              <div className="gold-divider w-16 mb-6" />
              <p className="text-warm-brown text-base leading-relaxed mb-4">
                With over a decade of baking experience and a passion that started in childhood, our founder brings artistry and dedication to every single creation. Trained in both classical and contemporary cake design, she combines technical mastery with an innate sense of beauty.
              </p>
              <p className="text-warm-brown text-base leading-relaxed mb-6">
                "I believe a cake is more than just food — it's a memory, a feeling, a celebration made tangible. Every cake I create is my way of saying: your moment matters."
              </p>
              <div className="flex items-center gap-4 mb-8">
                {[
                  { icon: Users, label: "500+ Happy Clients" },
                  { icon: Award, label: "Award-Winning Designs" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={18} className="text-gold" />
                    <span className="text-chocolate text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/custom-cake">
                <button className="px-7 py-3.5 rounded-full gold-gradient text-white font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                  Order Your Custom Cake
                  <ArrowRight size={16} />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-square">
                <img
                  src="/manus-storage/user-photo-5_344fe37b.jpg"
                  alt="The Baker"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-chocolate text-white text-center">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 variants={fadeUp} className="font-serif text-4xl font-bold text-white mb-4">
              Ready to Create Something Special?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Let's bring your vision to life. Start with our Custom Cake Builder or get in touch directly.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/custom-cake">
                <button className="px-8 py-4 rounded-full gold-gradient text-white font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                  Build Your Cake <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-200">
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
