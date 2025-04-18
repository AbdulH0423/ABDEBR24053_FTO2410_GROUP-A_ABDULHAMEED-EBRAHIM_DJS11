import PodcastHeader from "./Components/GlobalComponents/PodcastHeader";
import PodcastFooter from "./Components/GlobalComponents/PodcastFooter";
import LikedPodcasts from "./Components/GlobalComponents/LikedPodcasts";
import Library from "./Components/GlobalComponents/Library";
import RecommendedPodcasts from "./Components/GlobalComponents/RecommendedPodcasts";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    const saved = localStorage.getItem("currentEpisode");
    return saved ? JSON.parse(saved) : null;
  });

  const [episodeList, setEpisodeList] = useState([]);
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [liked, setLiked] = useState(() => {
    const stored = localStorage.getItem("liked");
    return stored ? JSON.parse(stored) : [];
  });

  const [likedEpisodes, setLikedEpisodes] = useState(() => {
    const stored = localStorage.getItem("likedEpisodes");
    return stored ? JSON.parse(stored) : [];
  });

  // Store current episode in localStorage
  useEffect(() => {
    if (currentEpisode) {
      localStorage.setItem("currentEpisode", JSON.stringify(currentEpisode));
    }
  }, [currentEpisode]);

  const handleLike = (podcast) => {
    const isLiked = liked.find((p) => p.id === podcast.id);
    const updatedLiked = isLiked
      ? liked.filter((p) => p.id !== podcast.id)
      : [...liked, podcast];

    setLiked(updatedLiked);
    localStorage.setItem("liked", JSON.stringify(updatedLiked));
  };

  const handleLikeEpisode = (episode) => {
    if (!episode) return;
    const isLiked = likedEpisodes.some((ep) => ep.id === episode.id);
    const updated = isLiked
      ? likedEpisodes.filter((ep) => ep.id !== episode.id)
      : [...likedEpisodes, episode];

    setLikedEpisodes(updated);
    localStorage.setItem("likedEpisodes", JSON.stringify(updated));
  };

  const playEpisode = (episode, list = []) => {
    const withImage = { ...episode, image: episode.image || episode.podcastImage };
    setCurrentEpisode(withImage);
    setEpisodeList(list);
    setEpisodeIndex(list.findIndex((e) => e.id === episode.id));
  };

  const playNext = () => {
    const next = episodeList[episodeIndex + 1];
    if (next) {
      const withImage = { ...next, image: next.image || next.podcastImage };
      setCurrentEpisode(withImage);
      setEpisodeIndex((prev) => prev + 1);
    }
  };

  const playPrev = () => {
    const prev = episodeList[episodeIndex - 1];
    if (prev) {
      const withImage = { ...prev, image: prev.image || prev.podcastImage };
      setCurrentEpisode(withImage);
      setEpisodeIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const savedEpisode = localStorage.getItem("lastPlayedEpisode");
    if (savedEpisode) {
      setCurrentEpisode(JSON.parse(savedEpisode));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <PodcastHeader onSearch={setSearchTerm} />

      <main className="pt-20 pb-24">
        <Routes>
          <Route
            path="/"
            element={
              <RecommendedPodcasts
              liked={liked}
              onLike={handleLike}
              onPlay={playEpisode}
              />
            }
          />
          <Route
            path="/library"
            element={
              <Library
                onLike={handleLike}
                liked={liked}
                searchTerm={searchTerm}
                onPlay={playEpisode}
              />
            }
          />
          <Route
            path="/liked"
            element={
              <LikedPodcasts
                liked={liked}
                onLike={handleLike}
                onPlay={playEpisode}
              />
            }
          />
          <Route
            path="/recommended"
            element={
              <RecommendedPodcasts
                liked={liked}
                onLike={handleLike}
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
          onLikeEpisode={handleLikeEpisode}
          likedEpisodes={likedEpisodes}
        />
      </div>
    </div>
  );
}

export default App;
