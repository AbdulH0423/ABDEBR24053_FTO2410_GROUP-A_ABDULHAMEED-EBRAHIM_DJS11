import { useState, useEffect } from "react";
import PodcastModal from '../Modals/PodcastModal'; // Adjust the path as necessary

// Genre ID to Title mapping
const genreMap = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

/**
 * Fetch and display podcasts by genre.
 * @param {Object} props
 * @param {function} props.onPlay - Function to play an episode
 * @returns {JSX.Element}
 */
function Genres({ onPlay }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  // Fetch podcasts for selected genre
  useEffect(() => {
    if (!selectedGenre) return;

    const fetchByGenre = async (genreId) => {
      setLoading(true);
      try {
        const res = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
        const data = await res.json();

        if (!data.shows || data.shows.length === 0) {
          setPodcasts([]);
          return;
        }

        const podcastsData = await Promise.all(
          data.shows.map(async (showId) => {
            const showRes = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
            return await showRes.json();
          })
        );

        const filteredPodcasts = podcastsData.filter(podcast => podcast !== null);
        setPodcasts(filteredPodcasts);
      } catch (err) {
        console.error("Failed to fetch genre:", err);
        setPodcasts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchByGenre(selectedGenre);
  }, [selectedGenre]);

  const handlePodcastClick = (podcast) => {
    console.log("Podcast clicked:", podcast); // Debugging log
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Browse by Genre</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(genreMap).map(([id, name]) => (
          <button
            key={id}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedGenre === Number(id)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
            onClick={() => setSelectedGenre(Number(id))}
          >
            {name}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading podcasts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {podcasts.length > 0 ? (
            podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => handlePodcastClick(podcast)} // Open modal on click
              >
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold truncate">{podcast.title}</h3>
                <p className="text-sm text-gray-600 truncate">{podcast.description}</p>
              </div>
            ))
          ) : (
            <p>No podcasts available for this genre.</p>
          )}
        </div>
      )}

      {/* Modal Implementation */}
      <PodcastModal
        podcast={selectedPodcast}
        isOpen={isModalOpen}
        onClose={() => {
          console.log("Closing modal"); // Debugging log
          setIsModalOpen(false);
        }}
        onPlay={onPlay}
      />
    </div>
  );
}

export default Genres;