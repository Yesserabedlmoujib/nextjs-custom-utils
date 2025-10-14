import { NextResponse } from "next/server";

const existingUsers = [
  { username: "john", email: "john@gmail.com" },
  { username: "mary", email: "mary@yahoo.com" },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username")?.toLowerCase();
  const email = searchParams.get("email")?.toLowerCase();

  await new Promise((res) => setTimeout(res, 700));

  let response = {
    usernameAvailable: true,
    emailAvailable: true,
    message: "",
  };

  if (username && existingUsers.some((u) => u.username === username)) {
    response.usernameAvailable = false;
  }

  if (email && existingUsers.some((u) => u.email === email)) {
    response.emailAvailable = false;
  }

  return NextResponse.json(response);
}
