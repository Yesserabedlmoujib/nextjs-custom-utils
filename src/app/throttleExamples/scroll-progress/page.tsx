"use client";

import { throttle } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    }, 100); // Update every 100ms

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <section
      id="Scroll Progress"
      className="flex flex-col items-center justify-center min-h-screen pt-34 px-4 xl:px-0"
    >
      {/* Header Section */}
      <div className="w-full max-w-4xl text-center mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-3 sm:mb-4">
          Throttled Scroll Progress
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2 sm:px-4 max-w-3xl mx-auto leading-relaxed">
          <strong>Throttling in action:</strong> This scroll progress indicator
          uses a throttled event listener that updates only once every 100ms
          during scrolling. Unlike debouncing which waits for pauses, throttling
          ensures regular but limited updates, providing smooth visual feedback
          while optimizing performance by reducing excessive function calls
          during rapid scroll events.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
        <div
          className="h-full bg-red-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Scrollable Content */}
      <div className="w-full max-w-4xl p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Scroll to see throttling in action
          </h2>
          <p className="text-gray-500 text-sm">
            Current progress:{" "}
            <span className="font-bold text-red-500">
              {progress.toFixed(1)}%
            </span>
          </p>
        </div>

        {[...Array(50)].map((_, i) => (
          <p
            key={i}
            className="text-base sm:text-lg text-gray-700 leading-relaxed"
          >
            Scroll down to see the progress bar fill. This is a throttled scroll
            listener running only once every 100ms for better performance.
            Paragraph {i + 1} of 50 - demonstrating smooth scroll tracking with
            optimized performance.
          </p>
        ))}
      </div>
    </section>
  );
}
