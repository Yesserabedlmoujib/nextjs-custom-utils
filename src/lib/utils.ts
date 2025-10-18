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

export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
) {
  let lastCall = 0;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

export function deepClone<T>(obj: T, hash = new WeakMap()): T {
  // Handle primitives and null/undefined
  if (obj === null || typeof obj !== "object") return obj;

  // Handle circular references
  if (hash.has(obj)) return hash.get(obj);

  // Handle Date
  if (obj instanceof Date) return new Date(obj.getTime()) as T;

  // Handle RegExp
  if (obj instanceof RegExp) return new RegExp(obj) as T;

  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArray: any[] = [];
    hash.set(obj, clonedArray);
    obj.forEach((item, index) => {
      clonedArray[index] = deepClone(item, hash);
    });
    return clonedArray as T;
  }

  // Handle Object
  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clonedObj);

  // Clone all properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key], hash);
    }
  }

  return clonedObj;
}
