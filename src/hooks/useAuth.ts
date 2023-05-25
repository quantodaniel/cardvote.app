"use client";

import "@/config/db";

import {
  User,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";

import { useEffect, useRef, useState } from "react";

const updateUserAvatar = async () => {
  const auth = getAuth();
  if (!auth.currentUser) return;

  const currentAvatar = localStorage.getItem("avatar");
  if (currentAvatar) return;

  const randomUserResponse = await fetch("/api/avatar");
  const randomUser = await randomUserResponse.json();
  if (!randomUser.photoURL) return;

  localStorage.setItem("avatar", randomUser.photoURL);

  updateProfile(auth.currentUser, {
    photoURL: randomUser.photoURL,
    displayName: randomUser.displayName,
  });
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const userUpdated = useRef(false);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        if (!userUpdated.current) {
          updateUserAvatar();
          userUpdated.current = true;
        }
      }
    });

    if (!auth.currentUser) signInAnonymously(auth);
  }, []);

  return { currentUser: user };
};
