"use client";
import { useState, useMemo, useEffect } from "react";
import { debounce } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";
import ProductSearch from "@/types/productSearch.types";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductSearch[]>([]);

  // on mount => fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch all products");
        const data: ProductSearch[] = await res.json();
        setAllProducts(data);
      } catch {
        setError("Failed to load all products.");
      }
    };
    fetchAllProducts();
  }, []);

  // Fetching  products by search term
  const fetchProducts = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products?query=${searchTerm}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ProductSearch[] = await res.json();
      setResults(data);
    } catch {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const debounceSearch = useMemo(() => debounce(fetchProducts, 600), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debounceSearch(value);
  };

  return (
    <div className="max-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-10">
        🧠 Debounced Product Search
      </h1>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Here we display all Products */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Products
          </h2>
          <div className="flex flex-wrap gap-2">
            {allProducts.map((x) => (
              <span
                key={x.id}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full border border-blue-200 hover:bg-blue-200 transition"
              >
                {x.name}
              </span>
            ))}
          </div>
        </div>

        {/* Here is the Search Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between min-h-[250px]">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Search</h2>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Type to search products..."
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4 min-h-[40px] flex items-center justify-center">
            {loading ? (
              <p className="text-blue-600 flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                <span>Loading...</span>
              </p>
            ) : error ? (
              <p className="text-red-600 flex items-center gap-2">
                ❌ <span>{error}</span>
              </p>
            ) : hasSearched && query && results.length === 0 ? (
              <p className="text-gray-500">No results found.</p>
            ) : null}
          </div>
        </div>

        {/* Here is the Search Results */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search Results
          </h2>
          {results.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {results.map((item) => (
                <span
                  key={item.id}
                  className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200 hover:bg-green-200 transition"
                >
                  {item.name}
                </span>
              ))}
            </div>
          ) : (
            !loading &&
            hasSearched &&
            query && (
              <p className="text-gray-500 italic">Try a different keyword...</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
