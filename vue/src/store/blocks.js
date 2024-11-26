export default {
    namespaced: true,
    state: {
        blocks: [],
        connections: [],
        size: 100,
        view: {
            top: 0,
            left: 0,
        },
    },
    getters: {
        getBlocks: (state) => {
            const view = state.view; // потому что вью тупой и не видит что геттер зависит от стейта view
            console.log(
                'getting blocks',
                JSON.stringify(state.blocks),
                state.blocks.map((block) => ({
                    top: block.top - view.top,
                    left: block.left - view.left,
                }))
            );
            return state.blocks.map((block) => ({
                top: block.top - view.top,
                left: block.left - view.left,
            }));
        },
        getBlock: (state) => (id) => {
            const view = state.view; // потому что вью тупой и не видит что геттер зависит от стейта view

            const block = state.blocks.find((block) => block.id == id);
            console.log('block-', {
                ...block,
                top: block.top - view.top,
                left: block.left - view.left,
            });
            return {
                ...block,
                top: block.top - view.top,
                left: block.left - view.left,
            };
        },
        getConnections: (state) => state.connections,
        getSize: (state) => state.size,
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
            console.log(
                'changedblock',
                newBlockData,
                JSON.stringify(state.blocks)
            );
        },
        ADD_CONNECTION: (state, connection) => {
            state.connections.push({ id: Date.now(), ...connection });
        },
        CHANGE_SIZE: (state, scale) => {
            state.size = state.size * 10 ** scale;
        },
        CHANGE_VIEW: (state, coordinates) => {
            state.view = { ...coordinates };
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
        changeSize({ commit }, scale) {
            commit('CHANGE_SIZE', scale);
        },
        changeView({ commit }, scale) {
            commit('CHANGE_VIEW', scale);
        },
    },
};
