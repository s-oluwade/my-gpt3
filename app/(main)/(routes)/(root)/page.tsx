
import { getNews } from "./actions";
import FilterSection from "./FilterSection";

export default function Home() {

    return (
        <main>
            <FilterSection getNews={getNews} />
        </main>
    );
}
