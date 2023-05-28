import { uploadImageFromBase64 } from "@/utils/storage";
import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function GET() {
  const pictureResponse = await openai.createImage({
    n: 1,
    prompt:
      "portrait of a poker player, woman or man, spotlight, Sony FE 24-70mm",
    size: "256x256",
    response_format: "b64_json",
  });

  const [firstPicture] = pictureResponse.data.data;
  const randomPicture = firstPicture.b64_json!;
  const photoURL = await uploadImageFromBase64(randomPicture);

  return NextResponse.json({ photoURL });
}
