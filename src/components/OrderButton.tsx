"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import usePizza from "@/hooks/usePizza";

const OrderButton = () => {
  const { totalPrice } = usePizza();
  const [isOrdering, setIsOrdering] = useState(false);
  const simulateOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      alert(
        `Your cosmic pizza is blasting off to your galaxy! Total: $${totalPrice.toFixed(
          2
        )}`
      );
    }, 2000);
  };
  return (
    <Button
      className="w-full text-lg py-6 bg-green-500 hover:bg-green-600 text-white transition-all transform hover:scale-105"
      onClick={simulateOrder}
      disabled={isOrdering}
    >
      {isOrdering ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Preparing Your
          Cosmic Order...
        </>
      ) : (
        <>🚀 Launch Your Galactic Pizza</>
      )}
    </Button>
  );
};

export default OrderButton;
