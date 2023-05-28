"use client";

import "@/config/firebase";
import userStore from "@/store/user";

import {
  User,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";

import { useEffect } from "react";

const updateUserName = async (currentUser: User) => {
  const userData = userStore.getState();
  if (userData.displayName) return;

  if (currentUser.displayName) {
    userData.setDisplayName(currentUser.displayName);
    return;
  }

  const randomDisplayName = await fetch("/api/user/name");
  const { displayName } = await randomDisplayName.json();

  userData.setDisplayName(displayName);
  updateProfile(currentUser, { displayName });
};

const updateUserAvatar = async (currentUser: User) => {
  const userData = userStore.getState();
  if (userData.photoURL) return;

  if (currentUser.photoURL) {
    userData.setPhotoURL(currentUser.photoURL);
    return;
  }

  const randomPicture = await fetch("/api/user/avatar");
  const { photoURL } = await randomPicture.json();

  userData.setPhotoURL(photoURL);
  updateProfile(currentUser, { photoURL });
};

export const useAuth = () => {
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        updateUserName(currentUser);
        updateUserAvatar(currentUser);
      }
    });

    if (!auth.currentUser) signInAnonymously(auth);

    return () => {
      unsubscribe();
    };
  }, []);
};
