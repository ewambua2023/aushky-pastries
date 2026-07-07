import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again or contact us on WhatsApp.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    sendContact.mutate(form);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-chocolate text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80)" }}
        />
        <div className="container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/254788400483?text=Hi%20Aushky%20Pastries%2C%20I%20would%20like%20to%20order%20a%20cake"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="block bg-[#25D366] rounded-2xl p-6 text-white hover:bg-[#1ebe5d] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Chat on WhatsApp</p>
                    <p className="text-white/80 text-sm">Fastest way to reach us</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm">+254 788 400 483</p>
              </motion.a>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 card-shadow space-y-5"
              >
                <h3 className="font-serif text-lg font-bold text-chocolate">Contact Details</h3>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-chocolate text-sm">Location</p>
                    <p className="text-warm-brown text-sm">Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gold shrink-0" />
                  <div>
                    <p className="font-medium text-chocolate text-sm">Phone</p>
                    <a href="tel:+254788400483" className="text-warm-brown text-sm hover:text-gold transition-colors">+254 788 400 483</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gold shrink-0" />
                  <div>
                    <p className="font-medium text-chocolate text-sm">Email</p>
                    <a href="mailto:aushkypastries@gmail.com" className="text-warm-brown text-sm hover:text-gold transition-colors">aushkypastries@gmail.com</a>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 card-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-gold" />
                  <h3 className="font-serif text-lg font-bold text-chocolate">Business Hours</h3>
                </div>
                <div className="space-y-2.5">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 7:00 PM" },
                    { day: "Saturday", hours: "8:00 AM – 7:00 PM" },
                    { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
                    { day: "Public Holidays", hours: "10:00 AM – 4:00 PM" },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-chocolate font-medium">{item.day}</span>
                      <span className="text-warm-brown">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * Orders can be placed online 24/7. WhatsApp responses during business hours.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 card-shadow"
              >
                <h3 className="font-serif text-lg font-bold text-chocolate mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/AushkyPastries/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] text-white text-sm font-medium hover:bg-[#166fe5] transition-colors flex-1 justify-center">
                    <Facebook size={16} /> Facebook
                  </a>
                  <a href="https://wa.me/254788400483" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe5d] transition-colors flex-1 justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg> WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 card-shadow"
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={32} className="text-gold-dark" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-chocolate mb-3">Message Sent!</h3>
                    <p className="text-warm-brown mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="px-6 py-3 rounded-full border-2 border-chocolate text-chocolate font-semibold hover:bg-chocolate hover:text-white transition-all duration-200"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-bold text-chocolate mb-2">Send Us a Message</h2>
                    <p className="text-warm-brown text-sm mb-7">
                      Have a question or want to discuss an order? Fill in the form below and we'll be in touch.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1.5">Full Name *</label>
                          <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1.5">Email Address *</label>
                          <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1.5">Phone Number</label>
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm"
                            placeholder="+254 700 000 000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-chocolate mb-1.5">Subject</label>
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm"
                          >
                            <option value="">Select a subject</option>
                            <option value="order">Place an Order</option>
                            <option value="quote">Request a Quote</option>
                            <option value="inquiry">General Inquiry</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-chocolate mb-1.5">Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold text-chocolate text-sm resize-none"
                          placeholder="Tell us about your cake order, event, or any questions you have..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sendContact.isPending}
                        className="w-full py-4 rounded-full gold-gradient text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Send size={18} />
                        {sendContact.isPending ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-white rounded-2xl overflow-hidden card-shadow"
              >
                <div className="h-64 bg-cream-dark flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin size={40} className="text-gold mx-auto mb-2" />
                    <p className="font-serif text-lg font-bold text-chocolate">Nairobi, Kenya</p>
                    <p className="text-warm-brown text-sm">Visit us or order for delivery</p>
                    <a
                      href="https://maps.google.com/?q=Nairobi,Kenya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block px-5 py-2 rounded-full gold-gradient text-white text-sm font-semibold hover:shadow-md transition-all duration-200"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
