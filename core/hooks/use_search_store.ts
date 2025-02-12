import { create } from "zustand"

export type SearchStore = {
	searchText: string
	actions: {
		onChangeSearchText: (text: string) => void
	}
}

export const useSearchStore = create<SearchStore>((set) => ({
	searchText: "",
	actions: {
		onChangeSearchText: (text) => set({ searchText: text }),
	},
}))

export const useSearchText = () => useSearchStore((state) => state.searchText)
export const useSearchActions = () => useSearchStore((state) => state.actions)
