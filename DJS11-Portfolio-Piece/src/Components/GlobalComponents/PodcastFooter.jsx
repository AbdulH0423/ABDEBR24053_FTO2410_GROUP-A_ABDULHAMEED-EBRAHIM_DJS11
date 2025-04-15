import { useState, useRef, useEffect } from "react";
import { 
  FaPlay, FaStepBackward, FaStepForward, 
  FaHeart, FaAlignLeft, FaListUl, FaVolumeUp 
} from "react-icons/fa";
import { Button } from "../UI/Button";

function PodcastFooter({ episode }) {
  
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Load new audio source when episode changes
  useEffect(() => {
    if (audioRef.current && episode?.file) {
      audioRef.current.pause();
      audioRef.current.src = episode.file;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Audio play error:", err));
      }
    }
  }, [episode]);

  // Toggle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Audio play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);


  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white p-4 shadow-inner">
      <audio ref={audioRef} />
      <div className="flex justify-between items-center flex-wrap gap-4">
        
        {/* Left: Now Playing */}
        <div className="flex items-center gap-4 flex-1 min-w-[150px]">
          <div>
            <img src="{season?.image}" />
            <p className="text-sm font-semibold">
              {episode?.podcastTitle || "Podcast"} - {episode?.title || "No episode selected"}
            </p>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center justify-center gap-4 flex-1 min-w-[200px]">
          <Button variant="ghost" size="icon"><FaStepBackward size={20} /></Button>
          <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
            <FaPlay size={20} />
          </Button>
          <Button variant="ghost" size="icon"><FaStepForward size={20} /></Button>
          <Button variant="ghost" size="icon" className="text-red-500"><FaHeart size={20} /></Button>
        </div>

        {/* Right: Volume */}
        <div className="flex items-center justify-end gap-4 flex-1 min-w-[180px]">
          <Button variant="ghost" size="icon" title="Transcript">
            <FaAlignLeft size={18} />
          </Button>

          <div className="flex items-center gap-2">
            <FaVolumeUp size={18} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <Button variant="ghost" size="icon" title="Queue">
            <FaListUl size={18} />
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default PodcastFooter;