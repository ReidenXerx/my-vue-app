import { defineStore } from 'pinia';

export const uselessListPersistentKey = 'uselessList'

type State = {
    [uselessListPersistentKey]: Array<string>,
}

export const useUselessList = defineStore(uselessListPersistentKey, {
  state: () => ({
    [uselessListPersistentKey]: (JSON.parse(localStorage.getItem(uselessListPersistentKey) || '[]')),
  }),
  getters: {
    getUselessList: (state) => state[uselessListPersistentKey],
  },
  actions: {
    addUselessListElement: (state: State, { element }: { element: string }) => {
			const res = [...state[uselessListPersistentKey], ...(!state[uselessListPersistentKey].includes(element) ? [element] : [])]
			state[uselessListPersistentKey] = res
      localStorage.setItem(uselessListPersistentKey, JSON.stringify(res))
    },
    removeUselessListElement: (state: State, { index }: { index: number }) => {
			const res = [...state[uselessListPersistentKey].slice(0, index), ...state[uselessListPersistentKey].slice(index + 1)]
			state[uselessListPersistentKey] = res
			localStorage.setItem(uselessListPersistentKey, JSON.stringify(res))
    },
  },
})

export default State