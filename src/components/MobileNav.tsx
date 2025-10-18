"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

interface NavLink {
  name: string;
  path: string;
}

const links: NavLink[] = [
  {
    name: "debounce",
    path: "/",
  },
  {
    name: "throttle",
    path: "/throttleExamples",
  },
  {
    name: "deepClone",
    path: "/deepCloneExamples",
  },
];

const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only"></SheetTitle>
        {/* logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              JS Utils Demo<span className="text-yellow-500">.</span>
            </h1>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname &&
                  "text-yellow-600 border-b-2 border-yellow-500"
                } text-xl capitalize hover:text-accent transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
