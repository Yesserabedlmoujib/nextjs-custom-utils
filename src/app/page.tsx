import Filters from "./filters/page";
import Search from "./search/page";

export default function Home() {
  return (
    <div>
      <Search />
      <Filters/>
    </div>
  );
}
