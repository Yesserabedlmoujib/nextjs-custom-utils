import { NextResponse } from "next/server";

const PRODUCTS = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Avocado" },
  { id: 4, name: "Orange" },
  { id: 5, name: "Mango" },
  { id: 6, name: "Pineapple" },
  { id: 7, name: "Watermelon" },
  { id: 8, name: "Strawberry" },
  { id: 9, name: "Grapes" },
  { id: 10, name: "Cherry" },
];

// GET /api/products?query=apple
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  // simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query));

  return NextResponse.json(filtered);
}
