import { useState } from "react";
import { 
  FaPlay, FaStepBackward, FaStepForward, 
  FaHeart, FaAlignLeft, FaListUl, FaVolumeUp 
} from "react-icons/fa";
import { Button } from "../UI/Button";

function PodcastFooter() {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white p-4 shadow-inner">
      <div className="flex justify-between items-center flex-wrap gap-4">
        
        {/* Left: Now Playing */}
        <div className="flex items-center gap-4 flex-1 min-w-[150px]">
          <div>
            <p className="text-sm font-semibold">Now Playing</p>
            <p className="text-xs text-gray-300">Podcast Title - Episode Name</p>
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

        {/* Right: Volume, Transcript, Queue */}
        <div className="flex items-center justify-end gap-4 flex-1 min-w-[180px]">
          {/* Transcript Button */}
          <Button variant="ghost" size="icon" title="Transcript">
            <FaAlignLeft size={18} />
          </Button>

          {/* Volume Slider */}
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

          {/* Queue Button */}
          <Button variant="ghost" size="icon" title="Queue">
            <FaListUl size={18} />
          </Button>
        </div>

      </div>
    </footer>
  );
};

export default PodcastFooter;