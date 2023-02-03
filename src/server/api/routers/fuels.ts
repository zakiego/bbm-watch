/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { prisma } from "../../db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const fuelsRouter = createTRPCRouter({
  getByCity: publicProcedure.query(async ({ input, ctx }) => {
    const data = await prisma.fuels.findMany({
      select: {
        id: true,
        type: true,
        price: true,
        City: {
          select: {
            id: true,
          },
        },
        date: true,
      },
    });

    return data;
  }),
});
