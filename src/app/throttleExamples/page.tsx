import MiniHeader from "@/components/reusable/MiniHeader";
import InfiniteScroll from "./infinite-scroll/page";
import Parallax from "./parallax/page";
import ScrollProgress from "./scroll-progress/page";

export default function throttle() {
  return (
    <>
      <div className="hidden xl:block">
        <MiniHeader
          navItems={[
            { name: "Parallax", href: "parallax" },
            { name: "Scroll Progress", href: "Scroll Progress" },
            {
              name: "Infinite Scroll API Loader",
              href: "Infinite Scroll API Loader",
            },
          ]}
        />
      </div>

      <Parallax />
      <ScrollProgress />
      <InfiniteScroll />
    </>
  );
}
