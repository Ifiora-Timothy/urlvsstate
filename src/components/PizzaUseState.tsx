"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import usePizza from "@/hooks/usePizza";

const toppings: {
  name: string;
  icon: string;
  price: number;
}[] = [
  { name: "Stardust Cheese", icon: "🧀", price: 2 },
  { name: "Meteor Meatballs", icon: "🍖", price: 3 },
  { name: "Alien Veggies", icon: "🥦", price: 2 },
  { name: "Cosmic Pepperoni", icon: "🍕", price: 2.5 },
];
const sizes = [
  { name: "Small", price: 10, icon: "🛸" },
  { name: "Medium", price: 12, icon: "🚀" },
  { name: "Large", price: 14, icon: "🛰️" },
  { name: "Galactic", price: 16, icon: "🌌" },
];

export function CosmicPizzaStateCustomizer() {
  const [size, setSize] = useState("Medium");
  const [sauce, setSauce] = useState(50);

  const [selectedToppings, setSelectedToppings] = useState<Array<string>>([]);

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };
  const { setTotal } = usePizza();
  const totalPrice = useMemo(() => {
    const basePrice = sizes.find((s) => s.name === size)?.price || 0;
    const toppingsPrice = selectedToppings.reduce((total, topping) => {
      const toppingPrice = toppings.find((t) => t.name === topping)?.price || 0;
      return total + toppingPrice;
    }, 0);
    const saucePrice = sauce > 50 ? (sauce - 50) * 0.1 : 0; // Extra sauce costs more
    return basePrice + toppingsPrice + saucePrice;
  }, [size, selectedToppings, sauce]);
  setTotal(totalPrice);
  console.log({ totalPrice });

  return (
    <div className="contents">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-red-600">
          Choose Your Stellar Size
        </Label>
        <RadioGroup
          value={size}
          onValueChange={setSize}
          className="flex flex-wrap gap-4"
        >
          {sizes.map((s) => (
            <Label
              htmlFor={s.name}
              key={s.name}
              className="flex  cursor-pointer items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md transition-transform hover:scale-105"
            >
              <RadioGroupItem value={s.name} id={s.name}></RadioGroupItem>
              <span className="text-red-600  cursor-pointer font-medium">
                {s.icon} {s.name} (${s.price})
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3 mt-6">
        <Label className="text-lg font-semibold text-red-600">
          Cosmic Sauce Intensity
        </Label>
        <Slider
          value={[sauce]}
          onValueChange={(value) => {
            setSauce(value[0]);
          }}
          max={100}
          step={1}
          className="bg-red-200  cursor-grab  rounded-full p-2"
        />
        <div className="text-red-600 text-center font-medium">
          {sauce}% sauce coverage{" "}
          {sauce > 50 ? `(+$${((sauce - 50) * 0.1).toFixed(2)})` : ""}
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <Label className="text-lg font-semibold text-red-600">
          Intergalactic Toppings
        </Label>
        <div className="grid grid-cols-2 gap-4">
          {toppings.map((topping) => (
            <Button
              key={topping.name}
              variant={
                selectedToppings.includes(topping.name) ? "default" : "outline"
              }
              onClick={() => toggleTopping(topping.name)}
              className={`w-full transition-all ${
                selectedToppings.includes(topping.name)
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white text-red-600 hover:bg-red-100"
              }`}
            >
              {topping.icon} {topping.name} (${topping.price})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
