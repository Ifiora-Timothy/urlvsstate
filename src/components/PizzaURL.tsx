"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

import { useDebouncedCallback } from "use-debounce";

const toppings = [
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

export function CosmicPizzaCustomizer() {
  const router = useRouter();
  const pathName = usePathname();

  const searchParams = useSearchParams();

  const [size, setSize] = useState(searchParams.get("size") || "Medium");
  const [sauce, setSauce] = useState(
    parseInt(searchParams.get("sauce") || "50")
  );
  const [selectedToppings, setSelectedToppings] = useState(
    searchParams.get("toppings")?.split(",") || []
  );

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key == "toppings") {
      const prevToppings = searchParams.get("toppings")?.split(",") ?? [];
      const newToppings = selectedToppings.filter((val) => val != value);
      if (prevToppings.includes(value)) {
        console.log({
          value,
          selectedToppings,
          inc: selectedToppings.includes(value),
          newToppings,
        });

        setSelectedToppings(newToppings);
        params.set("toppings", newToppings.toString());
      } else {
        setSelectedToppings([...selectedToppings, value]);
        console.log(
          { val: value },
          { topp: [...prevToppings, value].join(",") }
        );

        params.set("toppings", [...prevToppings, value].join(","));
      }
    } else {
      params.set(key, value);
    }
    if (key == "sauce") {
      debounced(params);
    } else {
      router.push(`${pathName}?${params.toString()}`, { scroll: false });
    }
  };

  const debounced = useDebouncedCallback((params: URLSearchParams) => {
    params.set("sauce", sauce.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }, 60);

  return (
    <div className="contents">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-red-600">
          Choose Your Stellar Size
        </Label>
        <RadioGroup
          value={size}
          onValueChange={(val) => {
            setSize(val);
            updateParams("size", val);
          }}
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
            updateParams("sauce", sauce.toString());
          }}
          max={100}
          step={1}
          className="bg-red-200 cursor-grab rounded-full p-2"
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
              onClick={() => {
                updateParams("toppings", topping.name);
              }}
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
