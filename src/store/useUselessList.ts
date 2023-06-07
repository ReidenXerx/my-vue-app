import { defineStore } from 'pinia';

const persistentKey = 'uselessList'

type State = {
    [persistentKey]: Array<string>,
}

export const useUselessList = defineStore('uselessList', {
  state: () => ({
    [persistentKey]: (JSON.parse(localStorage.getItem(persistentKey) || '[]')),
  }),
  getters: {
    getUselessList: (state) => state[persistentKey],
  },
  actions: {
    addUselessListElement: (state: State, { element }: { element: string }) => {
			const res = [...state[persistentKey], ...(!state[persistentKey].includes(element) ? [element] : [])]
			state[persistentKey] = res
      localStorage.setItem(persistentKey, JSON.stringify(res))
    },
    removeUselessListElement: (state: State, { index }: { index: number }) => {
			const res = [...state[persistentKey].slice(0, index), ...state[persistentKey].slice(index + 1)]
			state[persistentKey] = res
			localStorage.setItem(persistentKey, JSON.stringify(res))
    },
  },
})

export default State