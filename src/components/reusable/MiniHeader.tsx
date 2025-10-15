"use client";

import { useEffect, useState } from "react";
import MiniNav from "./MiniNav";

interface MiniHeaderProps {
  navItems?: Array<{ name: string; href: string }>;
}

const MiniHeader: React.FC<MiniHeaderProps> = ({ navItems }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`py-4 xl:py-3 fixed top-19 left-96 right-96 rounded-b-xl z-50 transition-all duration-300 shadow-md shadow-yellow-500 ${
        isScrolled ? "bg-primary/90 backdrop-blur-md" : "bg-slate-700"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        {/* desktop nav */}
        <div className="text-white font-semibold hidden xl:flex items-center gap-8">
          <MiniNav items={navItems} />
        </div>
      </div>
    </header>
  );
};

export default MiniHeader;
