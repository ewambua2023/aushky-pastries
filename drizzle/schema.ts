import {
  boolean,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", [
    "birthday_cakes",
    "wedding_cakes",
    "kids_cakes",
    "cupcakes",
    "cookies",
    "pastries",
    "desserts",
    "corporate_cakes",
    "seasonal_specials",
  ]).notNull(),
  startingPrice: decimal("startingPrice", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("imageUrl"),
  featured: boolean("featured").default(false).notNull(),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export const galleryItems = mysqlTable("gallery_items", {
  id: int("id").autoincrement().primaryKey(),
  imageUrl: text("imageUrl").notNull(),
  title: varchar("title", { length: 255 }),
  category: mysqlEnum("category", [
    "wedding",
    "birthday",
    "kids",
    "corporate",
    "cupcakes",
    "desserts",
  ]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerPhoto: text("customerPhoto"),
  rating: int("rating").notNull(),
  review: text("review").notNull(),
  occasion: varchar("occasion", { length: 255 }),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: mysqlEnum("category", [
    "tips",
    "inspiration",
    "news",
    "recipes",
    "trends",
  ]).notNull(),
  imageUrl: text("imageUrl"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

export const faqs = mysqlTable("faqs", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: mysqlEnum("category", [
    "ordering",
    "delivery",
    "payment",
    "storage",
    "customization",
    "lead_time",
  ]).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = typeof faqs.$inferInsert;

export const orderInquiries = mysqlTable("order_inquiries", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 50 }),
  occasion: varchar("occasion", { length: 255 }),
  cakeSize: varchar("cakeSize", { length: 100 }),
  cakeFlavor: varchar("cakeFlavor", { length: 100 }),
  cakeFrosting: varchar("cakeFrosting", { length: 100 }),
  tiers: int("tiers"),
  decorations: text("decorations"),
  cakeMessage: text("cakeMessage"),
  preferredDate: varchar("preferredDate", { length: 50 }),
  deliveryType: mysqlEnum("deliveryType", ["pickup", "delivery"]),
  deliveryAddress: text("deliveryAddress"),
  budget: varchar("budget", { length: 100 }),
  additionalNotes: text("additionalNotes"),
  estimatedPrice: decimal("estimatedPrice", { precision: 10, scale: 2 }),
  status: mysqlEnum("status", ["new", "contacted", "confirmed", "completed", "cancelled"])
    .default("new")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderInquiry = typeof orderInquiries.$inferSelect;
export type InsertOrderInquiry = typeof orderInquiries.$inferInsert;
