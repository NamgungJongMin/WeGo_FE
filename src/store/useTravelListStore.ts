import { Filters } from '@/@types/travel';
import { create } from 'zustand';

interface TravelListStore {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useTravelListStore = create<TravelListStore>((set) => ({
  filters: {
    startAt: '',
    endAt: '',
    isDomestic: null,
    sortOrder: null,
    searchText: '',
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));
