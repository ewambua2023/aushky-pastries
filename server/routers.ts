import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import {
  getAllProducts,
  getFeaturedProducts,
  getAllGalleryItems,
  getAllTestimonials,
  getFeaturedTestimonials,
  getAllBlogPosts,
  getBlogPostBySlug,
  getAllFaqs,
  createOrderInquiry,
  getAllOrderInquiries,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  products: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(({ input }) => getAllProducts(input?.category)),
    featured: publicProcedure.query(() => getFeaturedProducts()),
  }),

  gallery: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(({ input }) => getAllGalleryItems(input?.category)),
  }),

  testimonials: router({
    list: publicProcedure.query(() => getAllTestimonials()),
    featured: publicProcedure.query(() => getFeaturedTestimonials()),
  }),

  blog: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(({ input }) => getAllBlogPosts(input?.category)),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getBlogPostBySlug(input.slug)),
  }),

  faqs: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(({ input }) => getAllFaqs(input?.category)),
  }),

  contact: router({
    send: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().optional(),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        await notifyOwner({
          title: `New Contact Message from ${input.name}`,
          content: `
**Name:** ${input.name}
**Email:** ${input.email}
**Phone:** ${input.phone || "Not provided"}
**Subject:** ${input.subject || "General Inquiry"}

**Message:**
${input.message}
          `.trim(),
        });
        return { success: true };
      }),
  }),

  orders: router({
    submit: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1),
          customerEmail: z.string().email(),
          customerPhone: z.string().optional(),
          occasion: z.string().optional(),
          cakeSize: z.string().optional(),
          cakeFlavor: z.string().optional(),
          cakeFrosting: z.string().optional(),
          tiers: z.number().optional(),
          decorations: z.string().optional(),
          cakeMessage: z.string().optional(),
          preferredDate: z.string().optional(),
          deliveryType: z.enum(["pickup", "delivery"]).optional(),
          deliveryAddress: z.string().optional(),
          budget: z.string().optional(),
          additionalNotes: z.string().optional(),
          estimatedPrice: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createOrderInquiry({
          ...input,
          estimatedPrice: input.estimatedPrice?.toString(),
        });

        const priceStr = input.estimatedPrice
          ? `KES ${input.estimatedPrice.toLocaleString()}`
          : "Not specified";

        await notifyOwner({
          title: `New Cake Order Inquiry from ${input.customerName}`,
          content: `
**Customer:** ${input.customerName}
**Email:** ${input.customerEmail}
**Phone:** ${input.customerPhone || "Not provided"}
**Occasion:** ${input.occasion || "Not specified"}
**Cake Size:** ${input.cakeSize || "Not specified"}
**Flavor:** ${input.cakeFlavor || "Not specified"}
**Frosting:** ${input.cakeFrosting || "Not specified"}
**Tiers:** ${input.tiers || "Not specified"}
**Preferred Date:** ${input.preferredDate || "Not specified"}
**Delivery:** ${input.deliveryType || "Not specified"}
**Estimated Price:** ${priceStr}
**Notes:** ${input.additionalNotes || "None"}
          `.trim(),
        });

        return { success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getAllOrderInquiries();
    }),
  }),
});

export type AppRouter = typeof appRouter;
