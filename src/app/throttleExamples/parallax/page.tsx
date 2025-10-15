"use client";

import { throttle } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Parallax() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Throttle scroll updates to every 20ms for smoother animation
    const handleScroll = throttle(() => {
      setOffsetY(window.scrollY);
    }, 20);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="parallax" className="relative h-[300vh] overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
          transform: `translateY(${offsetY * 0.4}px)`, // slower background movement
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center p-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 transition-transform duration-300"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        >
          Parallax Scroll Effect
        </h1>
        <p
          className="text-lg sm:text-xl max-w-xl"
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        >
          This animation is powered by a throttled scroll listener — notice how
          smooth it feels even when scrolling quickly.
        </p>
      </div>
      {/* Header Section */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 transition-transform duration-300">
            Parallax Scroll Effect
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-6 leading-relaxed">
            <strong>Throttled Parallax Animation:</strong> This parallax effect
            uses a throttled scroll listener that updates every 20ms, creating
            smooth layered movements while preventing performance bottlenecks.
            Different elements move at varying speeds (background: 40%, title:
            20%, text: 10%) to create depth, with throttling ensuring consistent
            50 FPS updates even during rapid scrolling.
          </p>
        </div>
      </div>

      {/* More Content */}
      <div className="relative z-10 bg-white text-black p-6 sm:p-8 md:p-10 mt-[100vh]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Performance Optimized Parallax
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Scroll further to see the background image move at a slower rate
            than the text. Throttling ensures that the scroll handler runs only
            50 times per second, rather than hundreds, improving performance and
            reducing jank on slower devices.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
            <p className="text-sm text-gray-700">
              <strong>Technical Insight:</strong> Without throttling, scroll
              events could fire 100+ times per second. Our 20ms throttle limits
              this to 50 FPS while maintaining smooth visual feedback. Each
              layer moves at a different percentage of the scroll speed to
              create the parallax depth illusion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
