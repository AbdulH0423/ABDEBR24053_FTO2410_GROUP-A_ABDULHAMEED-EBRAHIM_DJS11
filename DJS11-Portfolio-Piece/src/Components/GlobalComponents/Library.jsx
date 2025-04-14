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