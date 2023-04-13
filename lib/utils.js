import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function arbritraryArray(n) {
    return Array.from(Array(n).keys());
}
