import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}..${address.slice(-4)}`;
};

export const formatNumber = (num) => {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(0) + ' T'; // Trillion
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(0) + ' B'; // Billion
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(0) + ' M'; // Million
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(0) + ' K'; // Thousand
  } else {
    return num.toString(); // Return the number as is if it's less than 1000
  }
};