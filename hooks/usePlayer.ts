import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }), // Fixed syntax here
  setIds: (ids: string[]) => set({ ids }), // Simplified property assignment
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
