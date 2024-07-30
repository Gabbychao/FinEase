import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "MMMM do, yyyy");
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};