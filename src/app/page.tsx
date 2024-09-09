import OrderButton from "@/components/OrderButton";
import PizzaSwitch from "@/components/PizzaSwitch";
import { CosmicPizzaCustomizer } from "@/components/PizzaURL";
import { CosmicPizzaStateCustomizer } from "@/components/PizzaUseState";
import ShareLinkButton from "@/components/ShareLinkButton";
import TotalPrice from "@/components/TotalPrice";
import { Toaster } from "@/components/ui/toaster";
import { ChefHat, Pizza, Rocket } from "lucide-react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
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
export default function Home({ searchParams }: Props) {
  const type = (searchParams.type as string) ?? "url";

  return (
    <div className="grid h-full items-center justify-items-center w-screen overflow-x-hidden ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="min-h-screen flex w-screen  items-center justify-center overflow-hidden p-4 sm:pr-6">
          <div className="bg-yellow-100 rounded-xl p-8 w-full max-w-[800px] space-y-6 relative  shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <img
                src="/placeholder.svg?height=800&width=600"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-lg gap-2 sm:text-4xl font-bold text-center text-red-600 mb-6 relative z-10 flex items-center justify-center">
              <ChefHat className="sm:sixe-10 size-8 mr-1 sm:mr-2" />
              Cosmic Pizza Creator
              <Rocket className="sm:sixe-10 size-8  mr-1 sm:mr-2" />
            </h1>

            <PizzaSwitch />

            <div className="flex flex-wrap md:flex-nowrap gap-8">
              <div className="w-full md:w-1/2 space-y-6 relative z-10">
                {type === "state" ? (
                  <CosmicPizzaStateCustomizer />
                ) : (
                  <CosmicPizzaCustomizer />
                )}
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div className="relative grid">
                  <div className="aspect-square w-[220px] justify-self-center bg-red-200  rounded-full shadow-lg border-8 border-yellow-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative bg-gren-200 size-52 rounded-full ">
                      <Pizza className="size-24 right-[-2px] top-[18px] rotate-[102deg] text-red-500 absolute animate-spin-slow" />
                      <Pizza className="size-24 right-[-7px] top-[84px] rotate-[162deg] text-red-500 absolute animate-spin-slow" />
                      <Pizza className="size-24 right-[47px] bottom-[-10px] rotate-[222deg] text-red-500 absolute animate-spin-slow" />
                      <Pizza className="size-24 left-[4px] bottom-[16px] rotate-[279deg] text-red-500 absolute animate-spin-slow" />
                      <Pizza className="size-24  left-[-7px] top-[30px] rotate-[336deg] text-red-500 absolute animate-spin-slow" />
                      <Pizza className="size-24  left-[50px] top-[-10px] rotate-[37deg] text-red-500 absolute animate-spin-slow" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="text-3xl font-bold text-center text-red-600 bg-yellow-200 rounded-full py-2 shadow-inner">
                    Total: $<TotalPrice sizes={sizes} toppings={toppings} />
                  </div>

                  <ShareLinkButton />
                  <OrderButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Toaster />
      </main>
    </div>
  );
}
