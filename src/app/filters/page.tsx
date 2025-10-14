"use client";

import { useState, useMemo, useEffect } from "react";
import { debounce } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductFilter from "@/types/productFilter";

export default function FiltersPage() {
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10);
  const [products, setProducts] = useState<ProductFilter[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      category,
      min: String(minPrice),
      max: String(maxPrice),
    });

    const res = await fetch(`/api/filter-products?${params.toString()}`);
    const data: ProductFilter[] = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const debouncedFetch = useMemo(
    () => debounce(fetchFilteredProducts, 500),
    [category, minPrice, maxPrice]
  );

  useEffect(() => {
    debouncedFetch();
  }, [category, minPrice, maxPrice]);

  return (
    <div className="max-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-10">
        Product Filters
      </h1>
      {/* Educational description about debounced filtering */}
      <p className="text-gray-600 text-center max-w-2xl mb-10 text-sm leading-relaxed">
        <strong>How Debounced Filtering Works:</strong> These filters use a
        500ms debounce delay that triggers only after you stop adjusting values.
        This prevents rapid, consecutive API calls when changing price ranges or
        categories, reducing server strain and providing smoother interaction
        while maintaining real-time responsiveness.
      </p>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="w-full max-w-md bg-stone-100 shadow-lg shadow-blue-500 rounded-xl p-6 mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Fruit">Fruit</SelectItem>
                <SelectItem value="Vegetable">Vegetable</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Bakery">Bakery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Price Range
            </label>
            <div className="flex justify-center items-center gap-3 mt-6">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border border-gray-300 rounded p-2 w-24 text-center focus:ring-1 focus:ring-blue-400"
              />
              <span className="text-gray-500 font-semibold">to</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border border-gray-300 rounded p-2 w-24 text-center focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="mt-4 min-h-[32px] flex items-center justify-center">
            {loading && (
              <p className="text-blue-600 flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                <span>Loading filtered products...</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {products.length > 0
            ? products.map((p) => (
                <div
                  key={p.id}
                  className="bg-stone-100 border rounded-xl shadow-md shadow-emerald-600 p-4 hover:shadow-lg transition flex flex-col gap-2"
                >
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                      {p.category}
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full border border-yellow-200">
                      ${p.price}
                    </span>
                  </div>
                </div>
              ))
            : !loading && (
                <p className="text-gray-500 italic col-span-full text-center">
                  No products match your filters.
                </p>
              )}
        </div>
      </div>
    </div>
  );
}
