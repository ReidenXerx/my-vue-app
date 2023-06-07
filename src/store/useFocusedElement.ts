import { defineStore } from 'pinia';
import { ActionTypes } from '../types';

export type State = {
    focusedElement: Array<number>,
    selectedElement: Array<number>,
    actionType?: ActionTypes,
}

const persistentKey = 'focusedElement'

export const useFocusedElement = defineStore('focusedElement', {
  state: () => ({
    [persistentKey]: (JSON.parse(localStorage.getItem(persistentKey) || '[0]')),
    selectedElement: (JSON.parse(localStorage.getItem(persistentKey) || '[0]')),
    actionType: undefined,
  }),
  getters: {
    getFocusedElement: (state) => state[persistentKey],
    getActionType: (state) => state.actionType
  },
  actions: {
    setFocusElement: (state: State, { focusedElement }: { focusedElement: Array<number> }) => {
      localStorage.setItem(persistentKey, JSON.stringify(focusedElement))
      state[persistentKey] = focusedElement
    },
    clearFocusElement: (state: State) => {
      localStorage.setItem(persistentKey, JSON.stringify([0]))
      state[persistentKey] = [0]
    },
    setActionType: (state: State, { actionType }: { actionType: ActionTypes }) => {
      state.actionType = actionType
    },
    clearActionType: (state: State) => {
      state.actionType = undefined
    },
    setSelectedElement: (state: State, { selectedElement }: { selectedElement: Array<number> }) => {
      state.selectedElement = selectedElement
    },
    clearSelectedElement: (state: State) => {
      state.selectedElement = [0]
    }
  },
})