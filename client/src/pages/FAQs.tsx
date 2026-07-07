import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Link as LinkIcon } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const STATIC_FAQS = [
  { id: 1, category: "ordering", question: "How do I place an order?", answer: "You can place an order through our Custom Cake Builder on the website, by calling us directly, or by sending us a message on WhatsApp. We recommend placing orders at least 5-7 days in advance for custom cakes.", sortOrder: 1 },
  { id: 2, category: "ordering", question: "How far in advance should I order?", answer: "For standard cakes, we require a minimum of 3-5 days notice. For elaborate custom designs, wedding cakes, or large orders, we recommend 2-4 weeks in advance to ensure we can accommodate your requirements.", sortOrder: 2 },
  { id: 3, category: "ordering", question: "Can I order a cake for the same day?", answer: "Same-day orders are subject to availability. Please call or WhatsApp us directly to check if we can accommodate your request. We always try our best to help!", sortOrder: 3 },
  { id: 4, category: "delivery", question: "Do you offer delivery?", answer: "Yes! We offer delivery across Nairobi and surrounding areas. Delivery fees vary based on your location. We also offer a free pickup option from our bakery.", sortOrder: 1 },
  { id: 5, category: "delivery", question: "What are your delivery zones?", answer: "We deliver throughout Nairobi, including Westlands, Karen, Kilimani, Lavington, Parklands, Eastlands, and surrounding areas. For locations outside Nairobi, please contact us to discuss options.", sortOrder: 2 },
  { id: 6, category: "delivery", question: "How do you ensure the cake arrives safely?", answer: "All our cakes are carefully packaged in sturdy boxes and transported in temperature-controlled vehicles. Our delivery team is trained to handle cakes with the utmost care.", sortOrder: 3 },
  { id: 7, category: "payment", question: "What payment methods do you accept?", answer: "We accept M-Pesa, bank transfers, cash on delivery, and major credit/debit cards. A 50% deposit is required to confirm your order, with the balance due on delivery or pickup.", sortOrder: 1 },
  { id: 8, category: "payment", question: "Do you require a deposit?", answer: "Yes, we require a 50% deposit to confirm and begin work on your order. The remaining 50% is due upon delivery or pickup. For orders over KES 20,000, we may require a higher deposit.", sortOrder: 2 },
  { id: 9, category: "storage", question: "How should I store my cake?", answer: "Most cakes can be stored at room temperature for 1-2 days in a cool, dry place. Cakes with fresh cream or fruit fillings should be refrigerated. Always keep cakes away from direct sunlight and heat.", sortOrder: 1 },
  { id: 10, category: "storage", question: "How long will my cake stay fresh?", answer: "Our cakes are best enjoyed within 2-3 days of delivery. Refrigerated cakes can last up to 5 days. We do not recommend freezing decorated cakes as it can affect the appearance.", sortOrder: 2 },
  { id: 11, category: "customization", question: "Can I request a completely custom design?", answer: "Absolutely! Custom designs are our specialty. You can share inspiration photos, describe your vision, or use our Custom Cake Builder. We'll work with you to create something truly unique.", sortOrder: 1 },
  { id: 12, category: "customization", question: "Can I choose my own flavours and fillings?", answer: "Yes! We offer a wide range of cake flavours including vanilla, chocolate, red velvet, lemon, carrot, and more. Fillings include buttercream, ganache, fresh cream, fruit compotes, and more.", sortOrder: 2 },
  { id: 13, category: "customization", question: "Do you cater for dietary requirements?", answer: "We offer gluten-free and eggless options on request. Please inform us of any dietary requirements when placing your order so we can accommodate them appropriately.", sortOrder: 3 },
  { id: 14, category: "lead_time", question: "What is the minimum lead time for a wedding cake?", answer: "For wedding cakes, we recommend booking at least 4-8 weeks in advance, especially during peak wedding season (December-January and July-August). Early booking ensures your preferred date is available.", sortOrder: 1 },
  { id: 15, category: "lead_time", question: "Can you handle last-minute orders?", answer: "We do our best to accommodate last-minute requests depending on our current workload. Please contact us directly and we'll let you know what's possible. Rush orders may incur an additional fee.", sortOrder: 2 },
];

const CATEGORY_LABELS: Record<string, string> = {
  ordering: "Ordering",
  delivery: "Delivery",
  payment: "Payment",
  storage: "Storage & Care",
  customization: "Customization",
  lead_time: "Lead Time",
};

const CATEGORY_ICONS: Record<string, string> = {
  ordering: "🛒",
  delivery: "🚚",
  payment: "💳",
  storage: "🎂",
  customization: "✨",
  lead_time: "⏰",
};

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-cream transition-colors"
      >
        <span className="font-medium text-chocolate text-sm md:text-base pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-gold" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 bg-cream-dark border-t border-border">
              <p className="text-warm-brown text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  const { data: faqs } = trpc.faqs.list.useQuery();
  const displayFaqs = faqs && faqs.length > 0 ? faqs : STATIC_FAQS;

  const categories = Array.from(new Set(displayFaqs.map((f) => f.category)));

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-chocolate text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1600&q=80)" }}
        />
        <div className="container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3"
          >
            Got Questions?
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-cream">
        <div className="container max-w-4xl">
          {categories.map((category) => {
            const categoryFaqs = displayFaqs.filter((f) => f.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{CATEGORY_ICONS[category] || "❓"}</span>
                  <h2 className="font-serif text-2xl font-bold text-chocolate">
                    {CATEGORY_LABELS[category] || category}
                  </h2>
                  <div className="flex-1 gold-divider" />
                </div>
                <div className="space-y-3">
                  {categoryFaqs.map((faq, i) => (
                    <FAQItem key={faq.id} question={faq.question} answer={faq.answer} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Still have questions */}
          <div className="bg-chocolate rounded-2xl p-8 text-center text-white mt-8">
            <h3 className="font-serif text-2xl font-bold mb-3">Still Have Questions?</h3>
            <p className="text-white/70 mb-6">
              Our team is happy to help. Reach out via WhatsApp, email, or our contact form.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/254788400483"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5d] transition-colors flex items-center gap-2 justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
              <Link href="/contact">
                <button className="px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-200 flex items-center gap-2 justify-center">
                  <LinkIcon size={15} />
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
