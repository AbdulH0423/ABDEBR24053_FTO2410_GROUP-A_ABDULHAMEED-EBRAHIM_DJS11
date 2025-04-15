import { useState , useEffect} from "react";
import { FaHeart} from "react-icons/fa";
import { Button } from "../UI/Button";
import PodcastModal from "../Modals/PodcastModal";


function Library({onLike, onEpisodeSelect}) {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [isModalOpen, setIsmodalOpen] = useState(false);


    useEffect(() => {
        const fetchPodcasts = async () => {
            try {

                setLoading(true);

                const response = await fetch("https://podcast-api.netlify.app");
                if (!response.ok){
                    throw new Error("Failed to fetch episodes");
                }
                const data = await response.json();
                setPodcasts(data);
                

                if (data.length > 0) {
                    setLoading(false);
                }
            }catch (error) {
                setError(error.message);

            }finally {
                setLoading(false);
            }
            
        }
        fetchPodcasts();
        
    }, []);

    const openModal = (podcast) => {
        setSelectedPodcast(podcast);
        setIsmodalOpen(true);

    };

    const closeModal =()=> {
        setIsmodalOpen(false);
        setSelectedPodcast(null);
    }

    

    if (loading) {
        return (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
            <div
          key={i}
            className="animate-pulse bg-white shadow rounded-lg p-4 space-y-4"
        >
          <div className="h-4 bg-gray-400 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
      ))}
    </div>
          );
   
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                <h1 className="text-5xl font-extrabold">{error}</h1>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {podcasts.map((podcast) => (
                <div key={podcast.id} className="bg-white rounded-lg shadow p-4 cursor-pointer flex gap-4 hover:bg-gray-300 transition duration-200" 
                onClick={() => openModal(podcast)}>
                    <img src={podcast.image} alt={podcast.title} className ="w-auto h-20 rounded-lg mb-4" />
                    
                    <div className= "flex-grow">
                        <h2 className="text-lg font-semibold mb-2">{podcast.title}</h2>
                        <p className="text-sm text-gray-700">{podcast.seasons} Seasons</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation(); // ← prevents click from opening modal
                                onLike(podcast);
                                            }}
                        >
                            <FaHeart size={20} className="text-red-400" />
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
                onEpisodeSelect(episode);
                setIsmodalOpen(false); //close modal when an episode is selected
              }}
             />

            
        </>
    );


}

export default Library;