import type { FuelType } from "@prisma/client";

export const parseFuelType = (fuelType: FuelType) => {
  return fuelType.replaceAll("_", " ");
};

export const parsePrice = (price: number) => {
  if (price === 0) {
    return "-";
  }

  return `Rp. ${price.toLocaleString("id-ID")}`;
};

export const parseDateToIndonesiaDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
