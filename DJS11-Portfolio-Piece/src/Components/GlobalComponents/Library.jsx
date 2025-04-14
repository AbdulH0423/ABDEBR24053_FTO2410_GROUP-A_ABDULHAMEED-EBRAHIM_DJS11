import { useState , useEffect} from "react";
/* import { FaBookOpen, FaSearch, FaPlus } from "react-icons/fa";
 */

function Library(){
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className="grid grid-cols-1 gap-4 p-4">
        {podcasts.map((podcast) => (
            <div key={podcast.id} className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-300 transition duration-200" 
            >

                <img src={podcast.image} alt={podcast.title} className ="w-auto h-32 rounded-lg mb-4" />
                
                <h2 className="text-lg font-semibold mb-2">{podcast.title}</h2>
                <p className="text-sm text-gray-700">{podcast.seasons} Seasons</p>
      </div>
      ))}
        </div>

    )


}

export default Library;