"use client";

import { PizzaContext } from "@/providers/PizzaContext";
import { useContext } from "react";

const usePizza = () => {
  const pizzaContext = useContext(PizzaContext);

  return { ...pizzaContext };
};

export default usePizza;
