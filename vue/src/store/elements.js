import { recipes } from "./recipes";

export default {
  namespaced: true,
  state: {
    openedElements: ["water", "fire", "earth", "air"],
    tableElements: ["", "", "", ""], // not in var cause after mix element didn't delete
  },
  getters: {
    getOpenedElements: (state) => {
      return state.openedElements;
    },
    getTableElements: (state) => {
      return state.tableElements;
    },
  },
  mutations: {
    ADD_ITEM_TO_TABLE: (state, element) => {
      const index = state.tableElements.indexOf("");
      console.log(index);

      if (index >= 0) {
        const copy = [...state.tableElements];
        copy[index] = element;
        state.tableElements = copy;
      }
    },
    CLEAR_TABLE: (state) => {
      state.tableElements = ["", "", "", ""];
    },
    ADD_OPENED_ELEMENT: (state) => {
      const result = recipes[state.tableElements.toSorted().join("")];

      if (result) {
        state.openedElements = new Set([...state.openedElements, result]);
        const copy = ["", "", "", ""];
        copy[0] = result;
        state.tableElements = copy;
      }
    },
  },
  actions: {
    addItemToTable({ commit }, element) {
      commit("ADD_ITEM_TO_TABLE", element);
    },
    clearTable({ commit }) {
      commit("CLEAR_TABLE");
    },
    addOpenedElement({ commit }) {
      commit("ADD_OPENED_ELEMENT");
    },
  },
};
