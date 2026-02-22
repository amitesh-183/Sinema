import { create } from "zustand";

interface SearchProps {
  searchQuery: string | null;
  setSearchQuery: (data: string | null) => void;
}

export const useSearch = create<SearchProps>((set) => ({
  searchQuery: null,
  setSearchQuery: (searchQuery) => set(() => ({ searchQuery })),
}));
