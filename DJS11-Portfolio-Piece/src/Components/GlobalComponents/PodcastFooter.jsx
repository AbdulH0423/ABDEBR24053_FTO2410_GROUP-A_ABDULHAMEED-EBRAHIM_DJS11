import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaBackward, FaForward, FaHeart, FaRegHeart,FaAlignLeft, FaListUl, FaVolumeUp } from "react-icons/fa";
import { Button } from "../UI/Button";

function PodcastFooter({ episode, onPlayNext, onPlayPrev, onLikeEpisode, likedEpisodes = [] }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load new episode or resume saved
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !episode?.file) return;

    audio.pause();
    audio.src = episode.file;
    audio.load();
    audio.volume = volume;

    const savedTime = localStorage.getItem("lastPlayedTime");
    const savedEpisodeId = localStorage.getItem("lastPlayedEpisodeId");

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      if (episode.id === savedEpisodeId && savedTime) {
        audio.currentTime = parseFloat(savedTime);
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    localStorage.setItem("lastPlayedEpisodeId", episode.id);
    localStorage.setItem("lastPlayedEpisode", JSON.stringify(episode));
  }, [episode]);

  // Play / Pause sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play().catch(console.warn) : audio.pause();
  }, [isPlaying]);

  // Progress + Save Time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      localStorage.setItem("lastPlayedTime", audio.currentTime.toString());
    };

    const handleEnd = () => {
      setIsPlaying(false);
      localStorage.removeItem("lastPlayedTime");
      if (onPlayNext) onPlayNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnd);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  // Save volume changes
  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (t) => {
    if (isNaN(t)) return "00:00";
    const mins = Math.floor(t / 60).toString().padStart(2, "0");
    const secs = Math.floor(t % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const isLiked = likedEpisodes.some((ep) => ep.id === episode?.id);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white px-4 pt-2 pb-3 shadow-inner">
      <audio ref={audioRef} />

      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* Now Playing Section */}
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          {episode?.image && (
            <img
              src={episode.image}
              alt="cover"
              className="w-12 h-12 rounded-md object-cover"
            />
          )}
          <div>
            <p className="text-sm font-semibold truncate max-w-[140px]">
              Episode {episode?.episode}
            </p>
            <p className="text-xs text-gray-300 truncate max-w-[160px]">
              {episode?.title || "No episode selected"}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center flex-1 min-w-[250px]">
          <div className="flex items-center justify-center gap-4 mb-1">
            <Button variant="ghost" size="icon" onClick={onPlayPrev}>
              <FaBackward size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onPlayNext}>
              <FaForward size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={isLiked ? "text-red-500" : ""}
              onClick={() => onLikeEpisode?.(episode)}
              title={isLiked ? "Unlike episode" : "Like episode"}
            >
              {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full px-2 text-xs text-gray-400">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded appearance-none cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Controls */}
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
