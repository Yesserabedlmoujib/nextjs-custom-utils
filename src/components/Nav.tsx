"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
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
    path: "/deepClone",
  },
];

const Nav = () => {
  const pathName = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathName && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent translate-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
