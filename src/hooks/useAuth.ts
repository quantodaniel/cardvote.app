"use client";

import "@/config/firebase";

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

  const randomPicture = fetch("/api/user/avatar");
  const randomDisplayName = fetch("/api/user/name");

  const [pictureResponse, displayNameResponse] = await Promise.all([
    randomPicture,
    randomDisplayName,
  ]);

  const { photoURL } = await pictureResponse.json();
  const { displayName } = await displayNameResponse.json();

  localStorage.setItem("avatar", photoURL);
  updateProfile(auth.currentUser, { photoURL, displayName });
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
          userUpdated.current = true;
          updateUserAvatar();
        }
      }
    });

    if (!auth.currentUser) signInAnonymously(auth);
  }, []);

  return { currentUser: user };
};
