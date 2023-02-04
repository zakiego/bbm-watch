import { prisma } from "../../db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const cityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const data = await prisma.city.findMany();

    return data;
  }),
});
