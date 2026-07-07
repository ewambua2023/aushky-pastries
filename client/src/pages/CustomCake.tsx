import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle, ShoppingBag, Calculator } from "lucide-react";
import { trpc } from "@/lib/trpc";

// Pricing config
const PRICING = {
  size: { "6-inch": 2500, "8-inch": 3500, "10-inch": 4800, "12-inch": 6500, "14-inch": 8500 },
  flavor: { vanilla: 0, chocolate: 300, "red-velvet": 400, lemon: 300, carrot: 400, "black-forest": 500 },
  frosting: { buttercream: 0, "cream-cheese": 400, fondant: 800, ganache: 600, "whipped-cream": 300 },
  tiers: { 1: 0, 2: 2000, 3: 4000, 4: 6000 },
  decorations: {
    "fresh-flowers": 1500,
    "sugar-flowers": 2000,
    "gold-leaf": 1800,
    "edible-prints": 1200,
    "fondant-figures": 2500,
    "sprinkles": 300,
    "drip": 500,
    "macarons": 1000,
  },
  delivery: { pickup: 0, delivery: 500 },
};

const schema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email required"),
  customerPhone: z.string().optional(),
  occasion: z.string().min(1, "Please select an occasion"),
  cakeSize: z.string().min(1, "Please select a size"),
  cakeFlavor: z.string().min(1, "Please select a flavor"),
  cakeFrosting: z.string().min(1, "Please select frosting"),
  tiers: z.number().min(1).max(4),
  decorations: z.array(z.string()),
  cakeMessage: z.string().optional(),
  preferredDate: z.string().optional(),
  deliveryType: z.enum(["pickup", "delivery"]),
  deliveryAddress: z.string().optional(),
  budget: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const OCCASIONS = ["Birthday", "Wedding", "Baby Shower", "Graduation", "Anniversary", "Corporate Event", "Kids Party", "Christmas", "Other"];
const SIZES = Object.keys(PRICING.size);
const FLAVORS = [
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate", label: "Chocolate (+KES 300)" },
  { value: "red-velvet", label: "Red Velvet (+KES 400)" },
  { value: "lemon", label: "Lemon (+KES 300)" },
  { value: "carrot", label: "Carrot (+KES 400)" },
  { value: "black-forest", label: "Black Forest (+KES 500)" },
];
const FROSTINGS = [
  { value: "buttercream", label: "Buttercream" },
  { value: "cream-cheese", label: "Cream Cheese (+KES 400)" },
  { value: "fondant", label: "Fondant (+KES 800)" },
  { value: "ganache", label: "Ganache (+KES 600)" },
  { value: "whipped-cream", label: "Whipped Cream (+KES 300)" },
];
const DECORATIONS = [
  { value: "fresh-flowers", label: "Fresh Flowers (+KES 1,500)" },
  { value: "sugar-flowers", label: "Sugar Flowers (+KES 2,000)" },
  { value: "gold-leaf", label: "Gold Leaf (+KES 1,800)" },
  { value: "edible-prints", label: "Edible Prints (+KES 1,200)" },
  { value: "fondant-figures", label: "Fondant Figures (+KES 2,500)" },
  { value: "sprinkles", label: "Sprinkles (+KES 300)" },
  { value: "drip", label: "Chocolate Drip (+KES 500)" },
  { value: "macarons", label: "Macarons (+KES 1,000)" },
];

function calculatePrice(data: Partial<FormData>): number {
  let total = 0;
  if (data.cakeSize) total += PRICING.size[data.cakeSize as keyof typeof PRICING.size] || 0;
  if (data.cakeFlavor) total += PRICING.flavor[data.cakeFlavor as keyof typeof PRICING.flavor] || 0;
  if (data.cakeFrosting) total += PRICING.frosting[data.cakeFrosting as keyof typeof PRICING.frosting] || 0;
  if (data.tiers) total += PRICING.tiers[data.tiers as keyof typeof PRICING.tiers] || 0;
  if (data.decorations) {
    data.decorations.forEach((d) => {
      total += PRICING.decorations[d as keyof typeof PRICING.decorations] || 0;
    });
  }
  if (data.deliveryType) total += PRICING.delivery[data.deliveryType] || 0;
  return total;
}

export default function CustomCake() {
  const [submitted, setSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tiers: 1,
      decorations: [],
      deliveryType: "pickup",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    setEstimatedPrice(calculatePrice(watchedValues));
  }, [JSON.stringify(watchedValues)]);

  const submitOrder = trpc.orders.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Order inquiry submitted! We'll be in touch within 24 hours.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again or contact us directly.");
    },
  });

  const onSubmit = (data: FormData) => {
    submitOrder.mutate({
      ...data,
      decorations: data.decorations.join(", "),
      estimatedPrice,
    });
  };

  const toggleDecoration = (value: string) => {
    const current = watchedValues.decorations || [];
    if (current.includes(value)) {
      setValue("decorations", current.filter((d) => d !== value));
    } else {
      setValue("decorations", [...current, value]);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 text-center card-shadow max-w-lg mx-4"
        >
          <div className="w-20 h-20 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-gold-dark" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-chocolate mb-3">Order Received!</h2>
          <p className="text-warm-brown mb-2">
            Thank you for your inquiry. We've received your custom cake request and will contact you within 24 hours to confirm details and pricing.
          </p>
          <p className="text-gold font-semibold text-lg mb-8">
            Estimated Price: KES {estimatedPrice.toLocaleString()}
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/254788400483"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5d] transition-colors"
            >
              Chat on WhatsApp for Faster Response
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-full border-2 border-chocolate text-chocolate font-semibold hover:bg-chocolate hover:text-white transition-all duration-200"
            >
              Submit Another Order
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
            Design Your Dream
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Custom Cake Builder
          </motion.h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </section>

      {/* Builder */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-7 card-shadow">
                  <h2 className="font-serif text-xl font-bold text-chocolate mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient text-white text-sm flex items-center justify-center font-bold">1</span>
                    Your Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Full Name *</label>
                      <input {...register("customerName")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm" placeholder="Your name" />
                      {errors.customerName && <p className="text-destructive text-xs mt-1">{errors.customerName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Email Address *</label>
                      <input {...register("customerEmail")} type="email" className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm" placeholder="your@email.com" />
                      {errors.customerEmail && <p className="text-destructive text-xs mt-1">{errors.customerEmail.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Phone Number</label>
                      <input {...register("customerPhone")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm" placeholder="+254 700 000 000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Occasion *</label>
                      <select {...register("occasion")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm">
                        <option value="">Select occasion</option>
                        {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {errors.occasion && <p className="text-destructive text-xs mt-1">{errors.occasion.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Cake Design */}
                <div className="bg-white rounded-2xl p-7 card-shadow">
                  <h2 className="font-serif text-xl font-bold text-chocolate mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient text-white text-sm flex items-center justify-center font-bold">2</span>
                    Cake Design
                  </h2>

                  {/* Size */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-chocolate mb-3">Cake Size *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {SIZES.map((size) => (
                        <label key={size} className="cursor-pointer">
                          <input type="radio" {...register("cakeSize")} value={size} className="sr-only" />
                          <div className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${watchedValues.cakeSize === size ? "border-gold bg-gold-light text-chocolate" : "border-border bg-cream hover:border-gold-light"}`}>
                            <p className="font-semibold text-sm">{size}</p>
                            <p className="text-xs text-muted-foreground">KES {PRICING.size[size as keyof typeof PRICING.size].toLocaleString()}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.cakeSize && <p className="text-destructive text-xs mt-1">{errors.cakeSize.message}</p>}
                  </div>

                  {/* Tiers */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-chocolate mb-3">Number of Tiers</label>
                    <div className="grid grid-cols-4 gap-3">
                      {[1, 2, 3, 4].map((tier) => (
                        <label key={tier} className="cursor-pointer">
                          <input type="radio" value={tier} onChange={() => setValue("tiers", tier)} className="sr-only" />
                          <div className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${watchedValues.tiers === tier ? "border-gold bg-gold-light text-chocolate" : "border-border bg-cream hover:border-gold-light"}`}>
                            <p className="font-semibold text-sm">{tier} {tier === 1 ? "Tier" : "Tiers"}</p>
                            <p className="text-xs text-muted-foreground">{tier === 1 ? "Incl." : `+KES ${PRICING.tiers[tier as keyof typeof PRICING.tiers].toLocaleString()}`}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Flavor */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-chocolate mb-3">Cake Flavor *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FLAVORS.map((f) => (
                        <label key={f.value} className="cursor-pointer">
                          <input type="radio" {...register("cakeFlavor")} value={f.value} className="sr-only" />
                          <div className={`px-4 py-2.5 rounded-xl border-2 text-sm transition-all duration-200 ${watchedValues.cakeFlavor === f.value ? "border-gold bg-gold-light text-chocolate font-semibold" : "border-border bg-cream hover:border-gold-light"}`}>
                            {f.label}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.cakeFlavor && <p className="text-destructive text-xs mt-1">{errors.cakeFlavor.message}</p>}
                  </div>

                  {/* Frosting */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-chocolate mb-3">Frosting Type *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FROSTINGS.map((f) => (
                        <label key={f.value} className="cursor-pointer">
                          <input type="radio" {...register("cakeFrosting")} value={f.value} className="sr-only" />
                          <div className={`px-4 py-2.5 rounded-xl border-2 text-sm transition-all duration-200 ${watchedValues.cakeFrosting === f.value ? "border-gold bg-gold-light text-chocolate font-semibold" : "border-border bg-cream hover:border-gold-light"}`}>
                            {f.label}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.cakeFrosting && <p className="text-destructive text-xs mt-1">{errors.cakeFrosting.message}</p>}
                  </div>

                  {/* Decorations */}
                  <div>
                    <label className="block text-sm font-medium text-chocolate mb-3">Decorations (Optional)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DECORATIONS.map((d) => (
                        <label key={d.value} className="cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(watchedValues.decorations || []).includes(d.value)}
                            onChange={() => toggleDecoration(d.value)}
                            className="sr-only"
                          />
                          <div className={`px-4 py-2.5 rounded-xl border-2 text-sm transition-all duration-200 flex items-center gap-2 ${(watchedValues.decorations || []).includes(d.value) ? "border-gold bg-gold-light text-chocolate font-semibold" : "border-border bg-cream hover:border-gold-light"}`}>
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${(watchedValues.decorations || []).includes(d.value) ? "border-gold bg-gold" : "border-muted"}`}>
                              {(watchedValues.decorations || []).includes(d.value) && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            {d.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-white rounded-2xl p-7 card-shadow">
                  <h2 className="font-serif text-xl font-bold text-chocolate mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient text-white text-sm flex items-center justify-center font-bold">3</span>
                    Additional Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Message on Cake</label>
                      <input {...register("cakeMessage")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm" placeholder="e.g. Happy Birthday Sarah!" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Preferred Date</label>
                      <input {...register("preferredDate")} type="date" className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm" min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Delivery or Pickup?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["pickup", "delivery"] as const).map((type) => (
                          <label key={type} className="cursor-pointer">
                            <input type="radio" {...register("deliveryType")} value={type} className="sr-only" />
                            <div className={`px-4 py-2.5 rounded-xl border-2 text-sm text-center transition-all duration-200 ${watchedValues.deliveryType === type ? "border-gold bg-gold-light text-chocolate font-semibold" : "border-border bg-cream hover:border-gold-light"}`}>
                              {type === "pickup" ? "🏪 Pickup" : `🚚 Delivery (+KES 500)`}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    {watchedValues.deliveryType === "delivery" && (
                      <div>
                        <label className="block text-sm font-medium text-chocolate mb-1.5">Delivery Address</label>
                        <input {...register("deliveryAddress")} className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm" placeholder="Your delivery address" />
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-chocolate mb-1.5">Additional Notes</label>
                      <textarea {...register("additionalNotes")} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm resize-none" placeholder="Any special requests, allergies, or inspiration details..." />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitOrder.isPending}
                  className="w-full py-4 rounded-full gold-gradient text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  {submitOrder.isPending ? "Submitting..." : "Submit Order Inquiry"}
                </button>
              </form>
            </div>

            {/* Price Estimator */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-chocolate rounded-2xl p-7 text-white">
                  <div className="flex items-center gap-2 mb-5">
                    <Calculator size={20} className="text-gold" />
                    <h3 className="font-serif text-xl font-bold">Live Price Estimate</h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    {watchedValues.cakeSize && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Size ({watchedValues.cakeSize})</span>
                        <span className="text-white font-medium">KES {PRICING.size[watchedValues.cakeSize as keyof typeof PRICING.size]?.toLocaleString()}</span>
                      </div>
                    )}
                    {watchedValues.tiers && watchedValues.tiers > 1 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">{watchedValues.tiers} Tiers</span>
                        <span className="text-white font-medium">+KES {PRICING.tiers[watchedValues.tiers as keyof typeof PRICING.tiers]?.toLocaleString()}</span>
                      </div>
                    )}
                    {watchedValues.cakeFlavor && PRICING.flavor[watchedValues.cakeFlavor as keyof typeof PRICING.flavor] > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Flavor</span>
                        <span className="text-white font-medium">+KES {PRICING.flavor[watchedValues.cakeFlavor as keyof typeof PRICING.flavor]?.toLocaleString()}</span>
                      </div>
                    )}
                    {watchedValues.cakeFrosting && PRICING.frosting[watchedValues.cakeFrosting as keyof typeof PRICING.frosting] > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Frosting</span>
                        <span className="text-white font-medium">+KES {PRICING.frosting[watchedValues.cakeFrosting as keyof typeof PRICING.frosting]?.toLocaleString()}</span>
                      </div>
                    )}
                    {(watchedValues.decorations || []).map((d) => (
                      <div key={d} className="flex justify-between text-sm">
                        <span className="text-white/70 capitalize">{d.replace(/-/g, " ")}</span>
                        <span className="text-white font-medium">+KES {PRICING.decorations[d as keyof typeof PRICING.decorations]?.toLocaleString()}</span>
                      </div>
                    ))}
                    {watchedValues.deliveryType === "delivery" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Delivery</span>
                        <span className="text-white font-medium">+KES 500</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/20 pt-5">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 font-medium">Estimated Total</span>
                      <motion.span
                        key={estimatedPrice}
                        initial={{ scale: 1.1, color: "oklch(72% 0.12 75)" }}
                        animate={{ scale: 1, color: "oklch(72% 0.12 75)" }}
                        className="font-serif text-2xl font-bold text-gold"
                      >
                        KES {estimatedPrice.toLocaleString()}
                      </motion.span>
                    </div>
                    <p className="text-white/40 text-xs mt-2">
                      * Final price confirmed after consultation. Prices may vary based on complexity.
                    </p>
                  </div>
                </div>

                {/* WhatsApp shortcut */}
                <div className="mt-5 bg-[#25D366] rounded-2xl p-5 text-white text-center">
                  <p className="font-semibold mb-2">Prefer to order via WhatsApp?</p>
                  <a
                    href="https://wa.me/254788400483?text=Hello!%20I%20would%20like%20to%20order%20a%20custom%20cake."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 rounded-xl bg-white text-[#25D366] font-bold text-sm hover:bg-green-50 transition-colors"
                  >
                    Chat with Us Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
