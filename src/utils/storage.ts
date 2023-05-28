import "@/config/firebase";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImageFromBase64 = async (imageBase64: string) => {
  const storage = getStorage();

  const filename = `images/${uuidv4()}.jpg`;
  const storageRef = ref(storage, filename);

  const imageBlob = Buffer.from(imageBase64, "base64");
  const snapshot = await uploadBytes(storageRef, imageBlob);
  return await getDownloadURL(snapshot.ref);
};
