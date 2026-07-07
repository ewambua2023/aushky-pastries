import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  products,
  galleryItems,
  testimonials,
  blogPosts,
  faqs,
  orderInquiries,
  InsertOrderInquiry,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  for (const field of textFields) {
    const value = user[field];
    if (value === undefined) continue;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Products
export async function getAllProducts(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db
      .select()
      .from(products)
      .where(and(eq(products.category, category as any), eq(products.available, true)))
      .orderBy(desc(products.createdAt));
  }
  return db.select().from(products).where(eq(products.available, true)).orderBy(desc(products.createdAt));
}

export async function getFeaturedProducts() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(products)
    .where(and(eq(products.featured, true), eq(products.available, true)))
    .orderBy(desc(products.createdAt))
    .limit(6);
}

// Gallery
export async function getAllGalleryItems(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.category, category as any))
      .orderBy(desc(galleryItems.createdAt));
  }
  return db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt));
}

// Testimonials
export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getFeaturedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.featured, true))
    .orderBy(desc(testimonials.createdAt))
    .limit(3);
}

// Blog
export async function getAllBlogPosts(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.published, true), eq(blogPosts.category, category as any)))
      .orderBy(desc(blogPosts.createdAt));
  }
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// FAQs
export async function getAllFaqs(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db
      .select()
      .from(faqs)
      .where(eq(faqs.category, category as any))
      .orderBy(faqs.sortOrder);
  }
  return db.select().from(faqs).orderBy(faqs.sortOrder);
}

// Order Inquiries
export async function createOrderInquiry(data: InsertOrderInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(orderInquiries).values(data);
}

export async function getAllOrderInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orderInquiries).orderBy(desc(orderInquiries.createdAt));
}
