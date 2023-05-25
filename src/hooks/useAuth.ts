"use client";

import "@/config/db";

import {
  User,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) return setUser(user);
    });

    if (!auth.currentUser) signInAnonymously(auth);
  }, []);

  return { currentUser: user };
};
