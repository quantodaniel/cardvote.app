"use client";

import "@/config/firebase";

import {
  User,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";

import { useEffect, useRef } from "react";

const updateUserAvatar = async (currentUser: User) => {
  const currentAvatar = localStorage.getItem("avatar");
  console.log("currentAvatar", currentAvatar);
  if (currentAvatar) return currentUser;

  const randomPicture = fetch("/api/user/avatar");
  const randomDisplayName = fetch("/api/user/name");

  const [pictureResponse, displayNameResponse] = await Promise.all([
    randomPicture,
    randomDisplayName,
  ]);

  const { photoURL } = await pictureResponse.json();
  const { displayName } = await displayNameResponse.json();

  localStorage.setItem("avatar", photoURL);
  updateProfile(currentUser, { photoURL, displayName });
};

export const useAuth = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) updateUserAvatar(currentUser);
    });

    if (!auth.currentUser) signInAnonymously(auth);
  }, []);
};
