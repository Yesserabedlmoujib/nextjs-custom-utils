import MiniHeader from "@/components/reusable/MiniHeader";
import ResumeBuilder from "./formStateManagement/page";
import ShoppingCart from "./shoppingCartManagement/page";
import ProjectBoard from "./project-board/page";

export default function throttle() {
  return (
    <>
      <MiniHeader
        navItems={[
          { name: "ShoppingCart", href: "ShoppingCart" },
          { name: " Resume Builder ", href: "Resume Builder" },

          {
            name: "Project Board",
            href: "ProjectBoard",
          },
        ]}
      />
      <ShoppingCart />
      <ResumeBuilder />
      <ProjectBoard />
    </>
  );
}
