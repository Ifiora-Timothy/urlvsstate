"use client";

import { PropsWithChildren, createContext, useState } from "react";

export const PizzaContext = createContext<{
  totalPrice: number;
  setTotal: (price: number) => void;
}>(null!);

export const PizzaProvider = ({ children }: PropsWithChildren) => {
  const [totalPrice, setTotalPrice] = useState(50);

  const setTotal = (price: number) => {
    setTotalPrice(price);
  };

  return (
    <PizzaContext.Provider value={{ setTotal, totalPrice }}>
      {children}
    </PizzaContext.Provider>
  );
};
