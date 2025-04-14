import PodcastFooter from "./Components/GlobalComponents/PodcastFooter";
import PodcastHeader from "./Components/GlobalComponents/PodcastHeader";
import Library from "./Components/GlobalComponents/Library";
/* import LoadingFooter from "./Components/Loading/LoadingFooter" */
/* import { useState, useRef } from "react"; */

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <PodcastHeader />

      <main className="pt-20 pb-24">
        <Library />
      </main>
      <PodcastFooter />
    </div>
  );
}

export default App;