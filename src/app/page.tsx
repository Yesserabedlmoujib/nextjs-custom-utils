import Filters from "./filters/page";
import Register from "./register/page";
import Search from "./search/page";

export default function Home() {
  return (
    <div>
      <Search />
      <Filters/>
      <Register/>
    </div>
  );
}
