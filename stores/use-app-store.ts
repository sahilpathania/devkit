import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  /** Tool slugs marked as favorites by the user */
  favorites: string[];
  /** Recently visited tool slugs (most recent first) */
  recentHistory: string[];
  /** Command palette open state */
  isCommandPaletteOpen: boolean;

  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  addToHistory: (slug: string) => void;
  clearHistory: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
}

const MAX_HISTORY = 20;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recentHistory: [],
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

      setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

      toggleCommandPalette: () =>
        set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
    }),
    {
      name: "devkit-store",
      partialize: (state) => ({
        favorites: state.favorites,
        recentHistory: state.recentHistory,
      }),
    }
  )
);
