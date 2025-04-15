import PodcastFooter from "./Components/GlobalComponents/PodcastFooter";
import PodcastHeader from "./Components/GlobalComponents/PodcastHeader";
import Library from "./Components/GlobalComponents/Library";
import { useState } from "react"; 
/* import LikedPodcasts from "./Components/GlobalComponents/LikedPodcasts";
import RecommendedPodcasts from "./Components/GlobalComponents/RecommendedPodcasts";
import LoadingFooter from "./Components/Loading/LoadingFooter" */
/* import { useState, useRef } from "react"; */

function App() {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  return (
    <div className="flex flex-col min-h-screen">
      <PodcastHeader />

      <main className="pt-20 pb-24">
        <div>
          <Library onEpisodeSelect={setCurrentEpisode} />
        </div>
      </main>
      <div className="min-h-screen pb-24">
          {/* content */}
          <PodcastFooter episode={currentEpisode} />
      </div>
    </div>
  );
}

export default App;