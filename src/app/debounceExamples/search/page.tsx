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
    <section
      id="search"
      className="flex flex-col items-center justify-center h-full pt-34 px-4 xl:px-0"
    >
      {/* Header Section */}
      <div className="w-full max-w-6xl text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-3 sm:mb-4">
          Debounced Product Search
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2 sm:px-4 max-w-4xl mx-auto leading-relaxed">
          <strong>Debouncing in action:</strong> This search delays API calls by
          600ms after typing stops, preventing unnecessary requests and
          providing a smoother user experience while reducing server load.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
        {/* All Products Section */}
        <div className="lg:col-span-3 xl:col-span-1 bg-stone-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg shadow-yellow-500 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            All Products
          </h2>
          <div className="flex flex-wrap gap-1 sm:gap-2 max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-64 overflow-y-auto">
            {allProducts.map((x) => (
              <span
                key={x.id}
                className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full border border-blue-200 hover:bg-blue-200 transition flex-shrink-0"
              >
                {x.name}
              </span>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="lg:col-span-3 xl:col-span-1 bg-stone-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500 border border-gray-100 flex flex-col justify-between min-h-[200px] sm:min-h-[250px]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Search
            </h2>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Type to search products..."
              className="border border-gray-300 rounded-lg p-2 sm:p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </div>

          <div className="mt-3 sm:mt-4 min-h-[32px] sm:min-h-[40px] flex items-center justify-center">
            {loading ? (
              <p className="text-blue-600 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <FaSpinner className="animate-spin text-sm sm:text-base" />
                <span>Loading...</span>
              </p>
            ) : error ? (
              <p className="text-red-600 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                ❌ <span>{error}</span>
              </p>
            ) : hasSearched && query && results.length === 0 ? (
              <p className="text-gray-500 text-sm sm:text-base">
                No results found.
              </p>
            ) : null}
          </div>
        </div>

        {/* Search Results Section */}
        <div className="lg:col-span-3 xl:col-span-1 bg-stone-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-300 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Search Results
          </h2>
          {results.length > 0 ? (
            <div className="flex flex-wrap gap-1 sm:gap-2 max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-64 overflow-y-auto">
              {results.map((item) => (
                <span
                  key={item.id}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-full border border-green-200 hover:bg-green-200 transition flex-shrink-0"
                >
                  {item.name}
                </span>
              ))}
            </div>
          ) : (
            !loading &&
            hasSearched &&
            query && (
              <p className="text-gray-500 italic text-sm sm:text-base">
                Try a different keyword...
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
