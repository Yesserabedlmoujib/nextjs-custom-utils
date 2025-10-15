"use client";

interface NavItem {
  name: string;
  href: string;
}

interface MiniNavProps {
  items?: NavItem[];
}

const MiniNav = ({
  items = [
    { name: "Search", href: "search" },
    { name: "Filters", href: "filters" },
    { name: "Register", href: "register" },
  ],
}: MiniNavProps) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="flex gap-8">
      {items.map((item) => {
        return (
          <button onClick={() => scrollToSection(item.href)} key={item.name}>
            {item.name}
          </button>
        );
      })}
    </nav>
  );
};

export default MiniNav;
