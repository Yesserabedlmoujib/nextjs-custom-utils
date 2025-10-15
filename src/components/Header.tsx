"use client";

import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`py-8 xl:py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md shadow-yellow-500 ${
        isScrolled ? "bg-primary/90 backdrop-blur-md" : "bg-slate-700"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* {Logo} */}
        <button onClick={scrollToTop}>
          <h1 className="pl-4 text-4xl font-semibold text-yellow-400">
            JS Utils Demo
          </h1>
        </button>
        {/* desktop nav */}
        <div className="text-white hidden xl:flex items-center gap-8">
          <Nav />
        </div>
        {/* mobile nav */}
        <div className="  xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
