import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  addDataset: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.db.category.createMany({
      data: [],
    });
  }), // Was one time

  getCategories: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.category.findMany();
  }),
});
