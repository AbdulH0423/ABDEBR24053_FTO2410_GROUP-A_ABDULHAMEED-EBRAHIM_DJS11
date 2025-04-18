import { useEffect, useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { Button } from "../UI/Button";
import PodcastModal from "../Modals/PodcastModal"; // same modal as Library

function RecommendedPodcasts({ liked, onLike, onPlay }) {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await fetch("https://podcast-api.netlify.app");
        if (!res.ok) throw new Error("Failed to fetch podcasts.");
        const data = await res.json();
        setAllPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const openModal = (podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPodcast(null);
  };

  const unliked = allPodcasts.filter(
    (podcast) => !liked.some((likedPodcast) => likedPodcast.id === podcast.id)
  );

  const recommended = [...unliked].sort(() => 0.5 - Math.random()).slice(0, 10);

  if (loading) return <div className="p-4 text-gray-500">Loading recommendations...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommended.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-green-100 p-4 rounded-lg shadow flex flex-col gap-2 cursor-pointer hover:bg-green-200 transition"
            onClick={() => openModal(podcast)}
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className="w-auto h-32 rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold">{podcast.title}</h3>
            <div className="flex gap-2 mt-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay({ ...podcast });
                  setIsModalOpen(false);
                }}
              >
                <FaPlay />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(podcast);
                }}
              >
                <FaHeart
                  className={
                    liked.some((p) => p.id === podcast.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }
                />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <PodcastModal
        podcast={selectedPodcast}
        isOpen={isModalOpen}
        onClose={closeModal}
        onPlay={(episode) => {
          onPlay(episode);
          closeModal();
        }}
      />
    </div>
  );
}

export default RecommendedPodcasts;
