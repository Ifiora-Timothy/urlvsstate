"use client";

import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

type Props = {};

const ShareLinkButton = (props: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);

    const newToast = toast({
      title:
        " Cosmic coordinates copied! Share your creation with fellow space explorers!",
      duration: 3000,

      className:
        "fixed max-w-full w-[400px]  top-4 z-20 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg",
    });

    setTimeout(() => {
      newToast.dismiss();
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Button
      className="w-full text-lg py-6 bg-blue-500 hover:bg-blue-600 text-white transition-all transform hover:scale-105"
      onClick={shareLink}
    >
      <Share2 className="mr-2 h-5 w-5" /> Share Your Cosmic Creation
    </Button>
  );
};

export default ShareLinkButton;
