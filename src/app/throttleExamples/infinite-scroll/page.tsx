"use client";

import { throttle } from "@/lib/utils";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  text: string;
}

export default function InfiniteScrollPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Simulated API fetch
  const fetchItems = async (page: number) => {
    setLoading(true);
    console.log(`Fetching page ${page}...`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: uuidv4(), // Truly unique ID
      text: `Item ${(page - 1) * 10 + i + 1}`,
    }));

    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    fetchItems(1);
  }, []);

  // Throttled scroll handler
  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // When user is near bottom
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        setPage((prev) => prev + 1);
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Fetch items when page changes
  useEffect(() => {
    if (page > 1) fetchItems(page);
  }, [page]);

  return (
    <section
      id="Infinite Scroll API Loader"
      className="flex flex-col items-center justify-center min-h-screen pt-34 px-4 xl:px-0"
    >
      {/* Header Section */}
      <div className="w-full max-w-4xl text-center mb-8 sm:mb-10 md:mb-12 pt-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-3 sm:mb-4">
          Infinite Scroll with Throttle
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2 sm:px-4 max-w-3xl mx-auto leading-relaxed">
          <strong>Throttled Infinite Scroll:</strong> This infinite scroll
          implementation uses a 1000ms throttle to check scroll position only
          once per second, preventing excessive API calls while scrolling.
          Unlike debouncing which waits for scrolling to stop, throttling
          ensures regular but controlled position checks, optimizing performance
          during rapid scrolling while maintaining responsive content loading.
        </p>
      </div>

      {/* Items Grid */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-cyan-400 rounded-lg shadow-md shadow-emerald-400 p-4 sm:p-6 text-center text-white font-semibold hover:shadow-lg transition-all duration-200 min-h-[120px] flex items-center justify-center"
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Loading indicator - placed outside the grid to prevent layout shifts */}
        {loading && (
          <div className="mt-8 sm:mt-10 text-center">
            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-medium">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Loading more items...
            </div>
          </div>
        )}

        {/* Educational Footer */}
        {!loading && items.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-gray-500 text-sm italic">
              Scroll down to trigger throttled loading. New items load when
              you're 100px from the bottom.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
