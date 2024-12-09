import { create } from 'zustand';

interface TravelIdState {
  id: string | null;
  setId: (id: string) => void;
}

export const useTravelIdStore = create<TravelIdState>((set) => ({
  id: null,
  setId: (id) => set({ id }),
}));
