import { uploadImageFromUrl } from "@/utils/storage";
import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function GET() {
  const pictureResponse = await openai.createImage({
    n: 1,
    prompt: "portrait of a poker player, spotlight, Sony FE 24-70mm",
    size: "256x256",
  });

  const [firstPicture] = pictureResponse.data.data;
  const randomPictureUrl = firstPicture.url!;
  const photoURL = await uploadImageFromUrl(randomPictureUrl);

  return NextResponse.json({ photoURL });
}
