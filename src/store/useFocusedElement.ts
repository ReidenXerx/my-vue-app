import { defineStore } from 'pinia';
import { ActionTypes } from '../types';

export type State = {
    focusedElement: Array<number>,
    selectedElement: Array<number>,
    actionType?: ActionTypes,
}

const focusedElementPersistentKey = 'focusedElement'

export const useFocusedElement = defineStore(focusedElementPersistentKey, {
  state: () => ({
    [focusedElementPersistentKey]: (JSON.parse(localStorage.getItem(focusedElementPersistentKey) || '[0]')),
    selectedElement: (JSON.parse(localStorage.getItem(focusedElementPersistentKey) || '[0]')),
    actionType: undefined,
  }),
  getters: {
    getFocusedElement: (state) => state[focusedElementPersistentKey],
    getActionType: (state) => state.actionType
  },
  actions: {
    setFocusElement: (state: State, { focusedElement }: { focusedElement: Array<number> }) => {
      localStorage.setItem(focusedElementPersistentKey, JSON.stringify(focusedElement))
      state[focusedElementPersistentKey] = focusedElement
    },
    clearFocusElement: (state: State) => {
      localStorage.setItem(focusedElementPersistentKey, JSON.stringify([0]))
      state[focusedElementPersistentKey] = [0]
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