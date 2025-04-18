import { useState , useEffect} from "react";
import { FaHeart, FaSortAlphaDown, FaSortAlphaUpAlt, FaClock } from "react-icons/fa";
import { Button } from "../UI/Button";
import PodcastModal from "../Modals/PodcastModal";


function Library({liked, onLike, onPlay , searchTerm ="" }) {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState(() => localStorage.getItem("sortOption") || "A-Z");
    

    useEffect(() => {
        localStorage.setItem("sortOption", sortOption);
      }, [sortOption]);

      const normalize = (str) =>
        str.toLowerCase().replace(/[^a-z0-9]/gi, "");

    let sortedPodcasts = [...podcasts];
    if (sortOption === "A-Z" || sortOption === ""){
        sortedPodcasts.sort(( a ,b )=> a.title.localeCompare(b.title));
    } else if (sortOption === "Z-A") {
        sortedPodcasts.sort(( a ,b ) => b.title.localeCompare(a.title));
    } else if (sortOption === "Most Recent") {
        sortedPodcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortOption === "Oldest") {
        sortedPodcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } 
    
    const filteredPodcasts = sortedPodcasts.filter((podcast) =>
        normalize(podcast.title).includes(normalize(searchTerm))
      );
    
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
            className="animate-pulse bg-black shadow rounded-lg p-4 space-y-4"
        >
          <div className="h-4 bg-gray-900 rounded w-full"></div>
          <div className="h-3 bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-500 rounded w-full"></div>
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

            <div className="bg-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 p-4">

                      {/* Sort Dropdown */}
                <div className="w-full sm:w-auto text-gray-900">
                    <label className="block text-sm font-semibold mb-1 text-gray-900">Sort by:</label>
                        <div className="relative">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="text-gray-100 appearance-none border rounded-md p-2 pr-8 text-sm w-full bg-gray-900 shadow focus:outline-none focus:ring"
                        >
                            <option value="A-Z">A - Z</option>
                            <option value="Z-A">Z - A</option>
                            <option value="Most Recent">Most Recent</option>
                            <option value="Oldest">Oldest</option>
                            
                        </select>
                        <div className="absolute right-2 top-2.5 text-gray-100 pointer-events-none">
                            {sortOption === "A-Z" && <FaSortAlphaDown />}
                            {sortOption === "Z-A" && <FaSortAlphaUpAlt />}
                            {sortOption === "Most Recent" && <FaClock />}
                            {sortOption === "Oldest" && <FaClock />}
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4  rounded-lg shadow-lg">
            {filteredPodcasts.length === 0 ? (
                    <p className="text-gray-100 p-4">No podcasts match your search.</p>
                    ) : (
                    filteredPodcasts.map((podcast) => (
                <div key={podcast.id} className="bg-gray-800 rounded-lg shadow p-4 cursor-pointer flex gap-4 hover:bg-gray-900 transition duration-200" 
                onClick={() => openModal(podcast)}>
                    <img src={podcast.image} alt={podcast.title} className ="w-auto h-20 rounded-lg mb-4" />
                    
                    <div className= "flex-grow">
                        <h2 className="text-lg font-semibold mb-2 text-gray-300">{podcast.title}</h2>
                        <p className="text-sm text-gray-500">{podcast.seasons} Seasons</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation(); // ← prevents click from opening modal
                                onLike(podcast);
                                            }}
                        >
                            <FaHeart size={20} className={liked.some((p) => p.id === podcast.id) ? "text-red-500" : "text-gray-200"} />
                        </Button>
                    </div>
                    
                
                </div>
        ))
        )}
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

            
        </>
    );


}

export default Library;