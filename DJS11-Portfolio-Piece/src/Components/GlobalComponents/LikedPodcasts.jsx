import { Button } from "../UI/Button";
import { FaHeart  } from "react-icons/fa";
import { useState } from "react";
import PodcastModal from "../Modals/PodcastModal";

// This component displays a list of liked podcasts.
function LikedPodcasts({ liked, onUnlike, onPlay  }) {
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPodcast(null);
    setIsModalOpen(false);
  };

    if (!liked || liked.length === 0) {
      return <div className="p-4 text-gray-500">No liked podcasts yet.</div>;
    }
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {liked.map((podcast) => (
            <div
                key={podcast.id}
                className="bg-white rounded-lg shadow p-4 cursor-pointer flex gap-4 hover:bg-gray-300 transition duration-200"
                onClick={() => openModal(podcast)}
              >
              
              
              <img src={podcast.image} alt={podcast.title} className="w-auto h-20 rounded-lg mb-4" />
              <div>
                  <h2 className="text-lg font-semibold mb-2">{podcast.title}</h2>
                  <Button Button variant="ghost" size="icon" onClick={() => onUnlike(podcast)}>
                      <FaHeart size={20} className="text-gray-500" />
                  </Button>
              </div>
              

            </div>
          ))}
        </div>
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
export default LikedPodcasts;
// This component displays a list of liked podcasts.  