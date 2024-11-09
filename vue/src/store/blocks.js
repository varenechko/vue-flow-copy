export default {
    namespaced: true,
    state: {
        blocks: [],
    },
    getters: {
        getBlocks: (state) => state.blocks,
    },
    mutations: {
        ADD_ITEM_TO_BLOCKS: (state, newItem) => {
            state.blocks.push({ id: Date.now(), ...newItem });
        },
        CHANGE_BLOCK: (state, { id, newBlockData }) => {
            state.blocks[state.blocks.findIndex((block) => id === block.id)] = {
                id,
                ...newBlockData,
            };
        },
    },
    actions: {
        addItemToBlocks({ commit }, newItem) {
            commit('ADD_ITEM_TO_BLOCKS', newItem);
        },
        changeBlockById({ commit }, { id, newBlockData }) {
            commit('CHANGE_BLOCK', { id, newBlockData });
        },
    },
};
