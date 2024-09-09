"use client";

import usePizza from "@/hooks/usePizza";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Props = {
  sizes: {
    name: string;
    price: number;
    icon: string;
  }[];
  toppings: {
    name: string;
    icon: string;
    price: number;
  }[];
};

const TotalPrice = ({ sizes, toppings }: Props) => {
  const searchParams = useSearchParams();
  const size = searchParams.get("size") ?? "Medium";
  const { setTotal, totalPrice: tToal } = usePizza();
  const sauce = parseInt(searchParams.get("sauce") || "50");
  const selectedToppings = searchParams.get("toppings")?.split(",") || [];

  const totalPrice = useMemo(() => {
    if (searchParams.get("type") != "state") {
      const basePrice = sizes.find((s) => s.name === size)?.price || 0;
      const toppingsPrice = selectedToppings.reduce((total, topping) => {
        const toppingPrice =
          toppings.find((t) => t.name === topping)?.price || 0;
        return total + toppingPrice;
      }, 0);
      const saucePrice = sauce > 50 ? (sauce - 50) * 0.1 : 0; // Extra sauce costs more
      const totalPrice = basePrice + toppingsPrice + saucePrice;
      setTotal(totalPrice);
    }
  }, [size, selectedToppings, sauce]);

  console.log({ tot: tToal });

  return tToal.toFixed(2);
};
export default TotalPrice;
