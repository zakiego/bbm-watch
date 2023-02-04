/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { appRouterCaller } from "~/src/server/api/root";
import { prisma } from "~/src/server/db";

describe("City Router", () => {
  it("should return a list of cities", async () => {
    const data = await appRouterCaller.city.getAll();
    const cityLength = await prisma.city.count();

    expect(data).toHaveLength(cityLength);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    );
  });
});

export {};
