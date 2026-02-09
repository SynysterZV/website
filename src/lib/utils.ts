import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Temporal } from "temporal-polyfill";

export function toDateString(date: string, type: "long" | "short") {
	return Temporal.PlainDate.from(date)
		.toLocaleString("en-US", {
			year: type == "long" ? "numeric" : undefined,
			month: type,
			day: "numeric"
		})
}

export function toYear(date: string) {
	return Temporal.PlainDate.from(date).year
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
