"use client";

const navItems = [
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

const MiniNav = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="flex gap-8">
      {navItems.map((item) => {
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
