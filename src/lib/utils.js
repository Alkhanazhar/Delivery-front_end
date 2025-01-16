import { LoadingContainer } from "@/components/shared/Loading";
import { clsx } from "clsx";
import { GoogleApiWrapper } from "google-maps-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ...
