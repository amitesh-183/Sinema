import { create } from "zustand";

interface GenreProps {
  genres: number | null;
  setGenreId: (data: number | null) => void;
}

export const useGenre = create<GenreProps>((set) => ({
  genres: null,
  setGenreId: (genres) => set(() => ({ genres })),
}));
