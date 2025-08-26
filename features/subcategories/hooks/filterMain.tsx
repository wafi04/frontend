import { create } from "zustand"

interface FilterState {
  category: number
  setCategory: (category: number) => void
  resetCategory: () => void
}

export const useFilterMain = create<FilterState>((set) => ({
  category: 7,
  setCategory: (category: number) => set({ category }),
  resetCategory: () => set({ category: 0 })
}))

export type { FilterState }