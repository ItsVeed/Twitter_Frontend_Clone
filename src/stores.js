import { writable } from "svelte/store";

export const user = writable(null);

export const authTokens = writable(null);

export const tweets = writable([]);
