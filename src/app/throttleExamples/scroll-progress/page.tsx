"use client";

import { useEffect, useState } from "react";
import { throttle } from "@/lib/utils";

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
    <div>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Scrollable Content */}
      <div className="p-10 space-y-10">
        {[...Array(50)].map((_, i) => (
          <p key={i} className="text-lg">
            Scroll down to see the progress bar fill. This is a throttled scroll
            listener running only once every 100ms for better performance.
          </p>
        ))}
      </div>
    </div>
  );
}
