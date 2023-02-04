import { FuelType, Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../db";

import { createTRPCRouter, publicProcedure } from "../trpc";

const defaultSelect: Prisma.FuelsSelect = {
  id: true,
  type: true,
  price: true,
  City: {
    select: {
      id: true,
    },
  },
  date: true,
};

export const fuelsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
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
      orderBy: [
        {
          date: "desc",
        },
        {
          cityId: "asc",
        },
      ],
    });

    return data;
  }),

  getByCity: publicProcedure
    .input(
      z.object({
        cityId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const data = await prisma.fuels.findMany({
        where: {
          cityId: input.cityId,
        },
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
        orderBy: [
          {
            date: "desc",
          },
          {
            cityId: "asc",
          },
        ],
      });

      return data;
    }),

  getByCityAndType: publicProcedure
    .input(
      z.object({
        cityId: z.string(),
        type: z.nativeEnum(FuelType),
      }),
    )
    .query(async ({ input }) => {
      const data = await prisma.fuels.findMany({
        where: {
          cityId: input.cityId,
          type: input.type,
        },
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
        orderBy: {
          createdAt: "desc",
        },
      });

      return data;
    }),

  compareByCity: publicProcedure
    .input(
      z.object({
        // first: z.object({ cityId: z.string(), type: z.nativeEnum(FuelType) }),
        first: z.object({ cityId: z.string() }),
        second: z.object({ cityId: z.string() }),
      }),
    )
    .query(async ({ input }) => {
      const { first, second } = input;

      const firstQuery = prisma.fuels.findMany({
        where: {
          cityId: first.cityId,
        },
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
        orderBy: {
          createdAt: "desc",
        },
      });

      const secondQuery = prisma.fuels.findMany({
        where: {
          cityId: second.cityId,
        },
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
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = await prisma.$transaction([firstQuery, secondQuery]);

      return {
        first: data[0],
        second: data[1],
      };
    }),

  compareByCityAndType: publicProcedure
    .input(
      z.object({
        first: z.object({ cityId: z.string(), type: z.nativeEnum(FuelType) }),
        second: z.object({ cityId: z.string(), type: z.nativeEnum(FuelType) }),
      }),
    )
    .query(async ({ input }) => {
      const { first, second } = input;

      const firstQuery = prisma.fuels.findFirst({
        where: {
          cityId: first.cityId,
          type: first.type,
        },
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
        orderBy: {
          createdAt: "desc",
        },
      });

      const secondQuery = prisma.fuels.findFirst({
        where: {
          cityId: second.cityId,
          type: second.type,
        },
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
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = await prisma.$transaction([firstQuery, secondQuery]);

      return {
        first: data[0],
        second: data[1],
      };
    }),
});
