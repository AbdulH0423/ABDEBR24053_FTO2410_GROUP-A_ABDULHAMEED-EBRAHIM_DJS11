import PodcastHeader from "./Components/GlobalComponents/PodcastHeader";
import PodcastFooter from "./Components/GlobalComponents/PodcastFooter";
import LikedPodcasts from "./Components/GlobalComponents/LikedPodcasts";
import Library from "./Components/GlobalComponents/Library";
import RecommendedPodcasts from "./Components/GlobalComponents/RecommendedPodcasts";
import { Routes, Route } from "react-router-dom";
import usePodcastStore from "./store/podcastStore";

function App() {
  const {
    currentEpisode,
    playEpisode,
    playNext,
    playPrev,
    liked,
    toggleLike,
  } = usePodcastStore();

  return (
    <div className="flex flex-col min-h-screen">
      <PodcastHeader onSearch={() => {}} />

      <main className="pt-20 pb-24">
        <Routes>
          <Route
            path="/"
            element={
              <RecommendedPodcasts
                liked={liked}
                onLike={toggleLike}
                onPlay={playEpisode}
              />
            }
          />
          <Route
            path="/library"
            element={
              <Library
                liked={liked}
                onLike={toggleLike}
                onPlay={playEpisode}
              />
            }
          />
          <Route
            path="/liked"
            element={
              <LikedPodcasts
                liked={liked}
                onLike={toggleLike}
                onPlay={playEpisode}
              />
            }
          />
          <Route
            path="/recommended"
            element={
              <RecommendedPodcasts
                liked={liked}
                onLike={toggleLike}
                onPlay={playEpisode}
              />
            }
          />
        </Routes>
      </main>

      <div className="min-h-screen pb-24">
        <PodcastFooter
          episode={currentEpisode}
          onPlayNext={playNext}
          onPlayPrev={playPrev}
        />
      </div>
    </div>
  );
}

export default App;
