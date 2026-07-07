import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// Mock the db and notification modules
vi.mock("./db", () => ({
  createOrderInquiry: vi.fn().mockResolvedValue(undefined),
  getAllOrderInquiries: vi.fn().mockResolvedValue([]),
  getAllProducts: vi.fn().mockResolvedValue([]),
  getFeaturedProducts: vi.fn().mockResolvedValue([]),
  getAllGalleryItems: vi.fn().mockResolvedValue([]),
  getAllTestimonials: vi.fn().mockResolvedValue([]),
  getFeaturedTestimonials: vi.fn().mockResolvedValue([]),
  getAllBlogPosts: vi.fn().mockResolvedValue([]),
  getBlogPostBySlug: vi.fn().mockResolvedValue(undefined),
  getAllFaqs: vi.fn().mockResolvedValue([]),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };
}

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const ctx = createAuthContext();
    const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];
    ctx.res.clearCookie = (name: string, options: Record<string, unknown>) => {
      clearedCookies.push({ name, options });
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
  });
});

describe("orders.submit", () => {
  it("submits an order inquiry successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.orders.submit({
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      customerPhone: "+254700000001",
      occasion: "Birthday",
      cakeSize: "8-inch",
      cakeFlavor: "chocolate",
      cakeFrosting: "buttercream",
      tiers: 1,
      decorations: "fresh-flowers",
      cakeMessage: "Happy Birthday!",
      preferredDate: "2025-01-15",
      deliveryType: "delivery",
      deliveryAddress: "123 Main St, Nairobi",
      estimatedPrice: 5800,
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects an order with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.orders.submit({
        customerName: "Jane Doe",
        customerEmail: "not-an-email",
        deliveryType: "pickup",
      })
    ).rejects.toThrow();
  });

  it("rejects an order with missing name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.orders.submit({
        customerName: "",
        customerEmail: "jane@example.com",
        deliveryType: "pickup",
      })
    ).rejects.toThrow();
  });
});

describe("orders.list (admin only)", () => {
  it("returns orders for admin users", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);
    const result = await caller.orders.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws for non-admin users", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(caller.orders.list()).rejects.toThrow("Unauthorized");
  });
});

describe("products.featured", () => {
  it("returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.products.featured();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("testimonials.list", () => {
  it("returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.testimonials.list();
    expect(Array.isArray(result)).toBe(true);
  });
});
