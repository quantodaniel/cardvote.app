import { NextResponse } from "next/server";

export async function GET() {
  const randomUserEndpoint = "https://randomuser.me/api?nat=us&inc=name";
  const userResponse = await fetch(randomUserEndpoint, { cache: "no-cache" });

  const user = await userResponse.json();
  const [firstUser] = user.results;

  const { first, last } = firstUser.name;
  const displayName = `${first} ${last}`;

  return NextResponse.json({ displayName });
}
