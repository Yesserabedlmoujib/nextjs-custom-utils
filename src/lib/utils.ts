import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  immediate = false
) {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const later = () => {
      timer = null;
      if (!immediate) fn.apply(context, args);
    };
    const callNow = immediate && !timer;
    if (timer) clearTimeout(timer);
    timer = setTimeout(later, delay);
    if (callNow) fn.apply(context, args);
  };
}
