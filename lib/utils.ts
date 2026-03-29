import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalized<T extends Record<string, string>>(
  field: T,
  locale: string,
): string {
  return field[locale as keyof T] ?? field.en ?? "";
}
