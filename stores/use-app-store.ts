import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  favorites: string[];
  recentHistory: string[];
  recentSearches: string[];
  isCommandPaletteOpen: boolean;

  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  addToHistory: (slug: string) => void;
  clearHistory: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
}

const MAX_HISTORY = 10;
const MAX_SEARCHES = 8;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentHistory: [],
      recentSearches: [],
      isCommandPaletteOpen: false,

      toggleFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.includes(slug)
            ? state.favorites.filter((s) => s !== slug)
            : [...state.favorites, slug],
        })),

      isFavorite: (slug) => get().favorites.includes(slug),

      addToHistory: (slug) =>
        set((state) => ({
          recentHistory: [
            slug,
            ...state.recentHistory.filter((s) => s !== slug),
          ].slice(0, MAX_HISTORY),
        })),

      clearHistory: () => set({ recentHistory: [] }),

      addRecentSearch: (query) => {
        const q = query.trim().toLowerCase();
        if (q.length < 2) return;
        set((state) => ({
          recentSearches: [q, ...state.recentSearches.filter((s) => s !== q)].slice(
            0,
            MAX_SEARCHES
          ),
        }));
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

      toggleCommandPalette: () =>
        set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
    }),
    {
      name: "toolbay-store",
      partialize: (state) => ({
        favorites: state.favorites,
        recentHistory: state.recentHistory,
        recentSearches: state.recentSearches,
      }),
    }
  )
);
