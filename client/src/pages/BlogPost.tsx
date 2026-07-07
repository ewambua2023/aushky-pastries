import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";

const STATIC_POSTS: Record<string, { title: string; excerpt: string; content: string; category: string; imageUrl: string; createdAt: Date }> = {
  "how-to-store-your-custom-cake": {
    title: "How to Store Your Custom Cake for Maximum Freshness",
    excerpt: "Learn the best practices for storing your custom cake to keep it fresh and delicious for days after your celebration.",
    content: `
Proper cake storage is essential to maintaining the quality and taste of your custom cake. Here are our expert tips:

**Room Temperature Storage**
Most custom cakes can be stored at room temperature for 1-2 days if kept in a cool, dry place away from direct sunlight. Cover loosely with a cake dome or plastic wrap to prevent drying out.

**Refrigerator Storage**
Cakes with fresh fruit fillings, cream cheese frosting, or whipped cream should be refrigerated. Place in an airtight container to prevent absorbing other flavours. Remove from the fridge 30-60 minutes before serving to allow it to come to room temperature.

**Freezing Your Cake**
Custom cakes can be frozen for up to 3 months. Wrap individual slices tightly in plastic wrap, then place in a freezer bag. Thaw overnight in the refrigerator.

**Signs Your Cake Has Gone Bad**
- Unusual smell or mould
- Slimy texture
- Off taste

When in doubt, throw it out! Food safety always comes first.
    `.trim(),
    category: "tips",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80",
    createdAt: new Date("2024-11-15"),
  },
  "top-wedding-cake-trends-2025": {
    title: "Top Wedding Cake Trends for 2025",
    excerpt: "From minimalist elegance to bold botanical designs, discover the wedding cake trends that are defining celebrations this year.",
    content: `
Wedding cakes in 2025 are all about personal expression and artistry. Here are the top trends we're seeing:

**1. Minimalist Elegance**
Clean lines, smooth fondant, and subtle texture work are dominating. Less is more — a single statement tier with hand-painted details creates maximum impact.

**2. Botanical & Floral**
Fresh flowers and hand-crafted sugar botanicals continue to reign supreme. Think cascading roses, tropical leaves, and delicate wildflowers.

**3. Metallic Accents**
Gold leaf, silver brushwork, and metallic drips add a touch of luxury that photographs beautifully.

**4. Textured Buttercream**
Rustic palette knife textures, ruffles, and organic swirls give cakes a handcrafted, artisanal feel.

**5. Flavour Innovation**
Couples are moving beyond vanilla and chocolate to explore passion fruit, salted caramel, and Kenyan tea-infused layers.
    `.trim(),
    category: "trends",
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=80",
    createdAt: new Date("2024-11-10"),
  },
};

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const { data: post } = trpc.blog.bySlug.useQuery({ slug });

  const displayPost = post || STATIC_POSTS[slug];

  if (!displayPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-chocolate mb-4">Article Not Found</h1>
          <Link href="/blog">
            <button className="px-6 py-3 rounded-full gold-gradient text-white font-semibold">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-chocolate text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${displayPost.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate/60 to-chocolate/90" />
        <div className="container relative z-10">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Blog
            </button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Tag size={11} /> {displayPost.category}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Calendar size={11} />
              {new Date(displayPost.createdAt).toLocaleDateString("en-KE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight"
          >
            {displayPost.title}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-cream">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 md:p-12 card-shadow"
          >
            <p className="text-warm-brown text-lg leading-relaxed mb-6 italic border-l-4 border-gold pl-5">
              {displayPost.excerpt}
            </p>
            <div className="gold-divider w-16 mb-8" />
            <div className="prose prose-lg max-w-none text-warm-brown leading-relaxed whitespace-pre-line">
              {displayPost.content}
            </div>
          </motion.div>

          <div className="mt-10 text-center">
            <Link href="/blog">
              <button className="flex items-center gap-2 mx-auto px-6 py-3 rounded-full border-2 border-chocolate text-chocolate font-semibold hover:bg-chocolate hover:text-white transition-all duration-200">
                <ArrowLeft size={16} /> Back to All Articles
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
