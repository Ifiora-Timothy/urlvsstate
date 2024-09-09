"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { useRouter, useSearchParams } from "next/navigation";

function PizzaSwitch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [useUrlState, setUseUrlState] = useState<boolean>(
    (searchParams.get("type") || "url") == "url"
  );

  const setState = (type: string) => {
    const params = new URLSearchParams();
    setUseUrlState(type === "url");

    params.set("type", type);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const updateState = () => {
    useUrlState ? setState("state") : setState("url");
  };

  return (
    <div className="flex items-center justify-center space-x-4 mb-4">
      <Label htmlFor="url-state" className="text-red-600 font-medium text-lg">
        {useUrlState ? "URL state" : "Local state"}
      </Label>
      <div
        className="relative inline-block w-20 h-10 rounded-full bg-[#e0812f] cursor-pointer"
        onClick={updateState}
      >
        <div
          className={`absolute left-0 top-0 w-10 h-10 rounded-full transition-transform duration-300 ease-in-out ${
            useUrlState
              ? "transform translate-x-full bg-yellow-400"
              : "bg-red-500"
          }`}
        >
          <div className="absolute inset-1 bg-yellow-200 rounded-full overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full" />
            <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-500 rounded-full" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaSwitch;
