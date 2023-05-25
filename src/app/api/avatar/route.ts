import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function GET() {
  const picturePromise = openai.createImage({
    n: 1,
    prompt: "portrait of a poker player, spotlight, Sony FE 24-70mm",
    size: "256x256",
  });

  const userPromise = fetch("https://randomuser.me/api?nat=us&inc=name", {
    cache: "no-cache",
  });

  const [pictureResponse, userResponse] = await Promise.all([
    picturePromise,
    userPromise,
  ]);

  const user = await userResponse.json();

  const photoURL = pictureResponse.data.data[0].url;
  const displayName = `${user.results[0].name.first} ${user.results[0].name.last}`;
  return NextResponse.json({ photoURL, displayName });
}
