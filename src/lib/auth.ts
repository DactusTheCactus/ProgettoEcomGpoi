import { writable } from 'svelte/store';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const user = writable(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.set(firebaseUser);
});

export async function login(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  await signOut(auth);
}