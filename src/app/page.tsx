import MiniHeader from "@/components/reusable/MiniHeader";
import Filters from "./debounceExamples/filters/page";
import Register from "./debounceExamples/register/page";
import Search from "./debounceExamples/search/page";

export default function Home() {
  return (
    <>
    <MiniHeader/>
      <Search />
      <Filters />
      <Register />
    </>
  );
}
