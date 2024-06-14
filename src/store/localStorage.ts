"use client";

export const localS = <T>(item: string, parse: boolean = false) => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(item);

  if (parse) {
    return JSON.parse(value as string) as T;
  }

  if (value) {
    return value as T;
  }

  return null;
};

export const removeFromLocalS = (item: string) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(item);
  } catch (error) {
    return null;
  }
};
