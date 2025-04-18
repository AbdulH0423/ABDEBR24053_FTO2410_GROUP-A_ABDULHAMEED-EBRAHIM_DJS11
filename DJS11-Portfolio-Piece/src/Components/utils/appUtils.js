/**
 * Format the time value in seconds to a MM:SS string.
 * @param {number} seconds - Time in seconds.
 * @returns {string} Formatted time as MM:SS.
 */
export function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }
  
  /**
   * Shuffle an array randomly.
   * @template T
   * @param {T[]} array - Array to shuffle.
   * @returns {T[]} New shuffled array.
   */
  export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  /**
   * Check if a podcast or episode is liked based on its ID.
   * @param {Array<{id: string}>} likedList - List of liked items.
   * @param {{id: string}} item - Podcast or episode to check.
   * @returns {boolean} True if the item is liked.
   */
  export function isLiked(likedList, item) {
    return likedList.some((liked) => liked.id === item.id);
  }
  
  /**
   * Toggle a podcast or episode in a liked list.
   * @param {Array<{id: string}>} likedList - Current liked list.
   * @param {{id: string}} item - Podcast or episode to toggle.
   * @returns {Array<{id: string}>} Updated liked list.
   */
  export function toggleLikedItem(likedList, item) {
    const isAlreadyLiked = likedList.some((liked) => liked.id === item.id);
    return isAlreadyLiked
      ? likedList.filter((liked) => liked.id !== item.id)
      : [...likedList, item];
  }
  