export default {
    namespaced: true,
    state: {
        blocks: [],
        connections: [],
    },
    getters: {
        getBlocks: (state) => state.blocks,
        getBlock: (state) => (id) =>
            state.blocks.find((block) => block.id == id),
        getConnections: (state) => state.connections,
    },
    mutations: {
        ADD_ITEM_TO_BLOCKS: (state, newItem) => {
            state.blocks.push({ id: Date.now(), ...newItem });
        },
        CHANGE_BLOCK: (state, { id, newBlockData }) => {
            state.blocks = state.blocks.map((elem) => {
                if (elem.id == id)
                    return {
                        id,
                        ...newBlockData,
                    };
                return elem;
            });
        },
        ADD_CONNECTION: (state, connection) => {
            state.connections.push({ id: Date.now(), ...connection });
        },
    },
    actions: {
        addItemToBlocks({ commit }, newItem) {
            commit('ADD_ITEM_TO_BLOCKS', newItem);
        },
        changeBlockById({ commit }, { id, newBlockData }) {
            commit('CHANGE_BLOCK', { id, newBlockData });
        },
        addConnection({ commit }, connection) {
            commit('ADD_CONNECTION', connection);
        },
    },
};
