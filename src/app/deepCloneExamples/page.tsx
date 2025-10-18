import MiniHeader from "@/components/reusable/MiniHeader";
import ResumeBuilder from "./formStateManagement/page";
import ShoppingCart from "./shoppingCartManagement/page";

export default function throttle() {
  return (
    <>
      <MiniHeader
        navItems={[
          { name: "ShoppingCart", href: "ShoppingCart" },
          { name: " Resume Builder ", href: "Resume Builder" },

          {
            name: "Infinite Scroll API Loader",
            href: "Infinite Scroll API Loader",
          },
        ]}
      />
      <ShoppingCart />
      <ResumeBuilder />
    </>
  );
}
