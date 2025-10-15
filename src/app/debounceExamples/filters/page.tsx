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

export default function Filters() {
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
    <section
      id="filters"
      className="flex flex-col items-center justify-center h-full pt-34 px-4 xl:px-0"
    >
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-3 sm:mb-4">
          Product Filters
        </h1>

        {/* Educational Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2 sm:px-4 max-w-4xl mx-auto">
          <strong>How Debounced Filtering Works:</strong> These filters use a
          500ms debounce delay that triggers only after you stop adjusting
          values. This prevents rapid, consecutive API calls when changing price
          ranges or categories, reducing server strain and providing smoother
          interaction while maintaining real-time responsiveness.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
        {/* Filters Panel */}
        <div className="w-full bg-stone-100 shadow-lg shadow-blue-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6">
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full text-sm sm:text-base">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className="text-sm sm:text-base">
                  All
                </SelectItem>
                <SelectItem value="Fruit" className="text-sm sm:text-base">
                  Fruit
                </SelectItem>
                <SelectItem value="Vegetable" className="text-sm sm:text-base">
                  Vegetable
                </SelectItem>
                <SelectItem value="Dairy" className="text-sm sm:text-base">
                  Dairy
                </SelectItem>
                <SelectItem value="Bakery" className="text-sm sm:text-base">
                  Bakery
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">
              Price Range
            </label>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                  Min:
                </span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 w-20 sm:w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                  min="0"
                />
              </div>
              <span className="text-gray-500 font-semibold text-sm sm:text-base hidden sm:block">
                to
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                  Max:
                </span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 w-20 sm:w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Loading State */}
          <div className="mt-4 min-h-[32px] flex items-center justify-center">
            {loading && (
              <p className="text-blue-600 flex items-center gap-2 text-sm sm:text-base">
                <FaSpinner className="animate-spin text-sm sm:text-base" />
                <span>Loading filtered products...</span>
              </p>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {products.length > 0
              ? products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-stone-100 border rounded-lg sm:rounded-xl shadow-md shadow-emerald-600 p-3 sm:p-4 hover:shadow-lg transition flex flex-col gap-2"
                  >
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200 whitespace-nowrap">
                        {p.category}
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full border border-yellow-200 whitespace-nowrap">
                        ${p.price}
                      </span>
                    </div>
                  </div>
                ))
              : !loading && (
                  <div className="col-span-full flex justify-center items-center min-h-[120px] sm:min-h-[150px]">
                    <p className="text-gray-500 italic text-sm sm:text-base text-center">
                      No products match your filters.
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </section>
  );
}
