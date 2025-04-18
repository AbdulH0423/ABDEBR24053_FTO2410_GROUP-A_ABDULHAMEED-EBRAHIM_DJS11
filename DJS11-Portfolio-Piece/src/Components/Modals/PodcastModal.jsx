import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence  } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";

function PodcastModal({ podcast, isOpen, onClose, onPlay }) {
  const [podcastDetails, setPodcastDetails] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!podcast || !isOpen) return;

    const fetchPodcastDetails = async () => {
      setLoading(true);
      setSelectedSeason(null);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${podcast.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch podcast details");
        }
        const data = await response.json();
        setPodcastDetails(data);
      } catch (err) {
        console.error(err);
        setPodcastDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [podcast, isOpen]);

  const handleSeasonChange = (index) => {
    setSelectedSeason(podcastDetails.seasons[index]);
  };

  const handlePlayEpisode = (episode) => {
    onPlay({
      ...episode,
      podcastTitle: podcast.title,
      image: selectedSeason?.image || podcast.image,
    });
    onClose(); // auto-close modal on play
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          {/* Greyed-out background/Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            aria-hidden="true"
            />  

          {/* Modal with Framer Motion fade-in */}
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  {podcast?.title || "Loading..."}
                  <img src={podcast?.image} alt="Podcast Cover" className="w-16 h-16 rounded-md ml-4"/>
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Body */}
              {loading ? (
                <div className="text-center text-gray-500">
                  <div className="animate-spin h-6 w-6 border-4 border-gray-600 border-t-transparent rounded-full mb-3">
          
                  </div>
                </div>
              ) : podcastDetails ? (
                <>
                  {/* Description with Read More */}
                  <div className="text-gray-700 text-sm">
                    <p
                      className={clsx(
                        "transition-all duration-300",
                        !showFullDescription && "line-clamp-3"
                      )}
                    >
                      {podcastDetails.description}
                    </p>
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-500 hover:underline mt-1 text-xs"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  </div>

                  {/* Season Dropdown */}
                  <div>
                    <label className="block font-medium mb-1">Select Season:</label>
                    <select
                      onChange={(e) => handleSeasonChange(e.target.value)}
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                    >
                      <option value="">-- Choose a season --</option>
                      {podcastDetails.seasons?.map((season, index) => (
                        <option key={season.season} value={index}>
                          Season {season.season}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Episode List */}
                  {selectedSeason && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Episodes</h3>
                      <ul className="space-y-1 max-h-40 overflow-y-auto text-sm text-gray-600">
                        {selectedSeason.episodes.map((ep, i) => (
                          <li
                            key={i}
                            onClick={() => handlePlayEpisode(ep)}
                            className="border-b py-1 cursor-pointer hover:text-blue-600 hover:underline"
                          >
                            {ep.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-red-500">No data available.</p>
              )}
            </motion.div>
          </div>
        </Dialog>)}
    </AnimatePresence>
  );
}

export default PodcastModal;
