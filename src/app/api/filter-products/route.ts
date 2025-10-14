import { NextResponse } from "next/server";

const PRODUCTS = [
  { id: 1, name: "Apple", category: "Fruit", price: 2 },
  { id: 2, name: "Banana", category: "Fruit", price: 1 },
  { id: 3, name: "Carrot", category: "Vegetable", price: 3 },
  { id: 4, name: "Broccoli", category: "Vegetable", price: 4 },
  { id: 5, name: "Milk", category: "Dairy", price: 5 },
  { id: 6, name: "Cheese", category: "Dairy", price: 8 },
  { id: 7, name: "Bread", category: "Bakery", price: 2 },
  { id: 8, name: "Croissant", category: "Bakery", price: 3 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const min = parseFloat(searchParams.get("min") || "0");
  const max = parseFloat(searchParams.get("max") || "9999");

  await new Promise((res) => setTimeout(res, 400));

  let filtered = PRODUCTS.filter((p) => p.price >= min && p.price <= max);

  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  return NextResponse.json(filtered);
}
