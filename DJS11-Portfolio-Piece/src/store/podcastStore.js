import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @typedef {Object} Episode
 * @property {string} id - Unique episode ID
 * @property {string} title - Episode title
 * @property {string} file - Audio file URL
 * @property {string} image - Episode image
 * @property {string} [podcastImage] - Optional podcast image fallback
 */

/**
 * Zustand store for managing podcast playback and liked episodes.
 */
const usePodcastStore = create(
  persist(
    (set, get) => ({
      /** @type {Episode|null} */
      currentEpisode: null,

      /** @type {Episode[]} */
      episodeQueue: [],

      /** @type {number} */
      currentIndex: 0,

      /** @type {Episode[]} */
      liked: [],

      /**
       * Play a specific episode and set the current queue.
       * @param {Episode} episode - The episode to play.
       * @param {Episode[]} [queue=[]] - The list of episodes to queue.
       */
      playEpisode: (episode, queue = []) => {
        const enriched = {
          ...episode,
          image: episode.image || episode.podcastImage,
        };

        set({
          currentEpisode: enriched,
          episodeQueue: queue,
          currentIndex: queue.findIndex((e) => e.id === episode.id),
        });
      },

      /**
       * Play the next episode in the queue.
       */
      playNext: () => {
        const { episodeQueue, currentIndex } = get();
        const next = episodeQueue[currentIndex + 1];
        if (next) {
          set({
            currentEpisode: {
              ...next,
              image: next.image || next.podcastImage,
            },
            currentIndex: currentIndex + 1,
          });
        }
      },

      /**
       * Play the previous episode in the queue.
       */
      playPrev: () => {
        const { episodeQueue, currentIndex } = get();
        const prev = episodeQueue[currentIndex - 1];
        if (prev) {
          set({
            currentEpisode: {
              ...prev,
              image: prev.image || prev.podcastImage,
            },
            currentIndex: currentIndex - 1,
          });
        }
      },

      /**
       * Toggle like status of a podcast or episode.
       * @param {Episode} episode - The episode or podcast to like/unlike.
       */
      toggleLike: (episode) => {
        const liked = get().liked;
        const isLiked = liked.find((p) => p.id === episode.id);
        const updated = isLiked
          ? liked.filter((p) => p.id !== episode.id)
          : [...liked, episode];
        set({ liked: updated });
      },
    }),
    {
      name: "podcast-storage", // localStorage key
      partialize: (state) => ({
        currentEpisode: state.currentEpisode,
        episodeQueue: state.episodeQueue,
        currentIndex: state.currentIndex,
        liked: state.liked,
      }),
    }
  )
);

export default usePodcastStore;
