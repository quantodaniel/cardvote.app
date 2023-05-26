import "@/config/firebase";

import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImageFromUrl = async (imageUrl: string) => {
  const storage = getStorage();

  const filename = `images/${uuidv4()}.jpg`;
  const storageRef = refStorage(storage, filename);

  const imageResponse = await fetch(imageUrl);
  const imageBlob = await imageResponse.arrayBuffer();

  const snapshot = await uploadBytes(storageRef, imageBlob);
  return await getDownloadURL(snapshot.ref);
};
