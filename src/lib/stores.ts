import { writable } from 'svelte/store';
import type { Product } from './types';

export const cartStore = writable<Product[]>([]);
export const cartOpen = writable<boolean>(false);
export const userStore = writable<null | {
  email: string;
  token: string;
  id: string;
}>(null);