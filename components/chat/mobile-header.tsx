"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function MobileBackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push("/chat")}
      className="md:hidden h-9 w-9"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}
