"use client";

import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    name: "Search",
    href: "search",
  },
  {
    name: "Filters",
    href: "filters",
  },
  {
    name: "Register",
    href: "register",
  },
];

const MobileNav: React.FC = () => {
  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-secondary mr-4" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        {/* logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Yesser Abdelmoujib<span className="text-blue-500">.</span>
            </h1>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8 font-bold text-blue-500">
          {navItems.map((item) => {
            return (
              <button
                onClick={() => scrollToSection(item.href)}
                key={item.name}
              >
                {item.name}
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
