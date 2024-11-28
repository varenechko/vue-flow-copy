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
            return state.blocks.map((block) => ({
                ...block,
                top: block.top - view.top,
                left: block.left - view.left,
            }));
        },
        getBlock: (state) => (id) => {
            const view = state.view; // потому что вью тупой и не видит что геттер зависит от стейта view

            const block = state.blocks.find((block) => block.id == id);

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
        ADD_ITEM_TO_BLOCKS: (state) => {
            state.blocks.push({
                id: Date.now(),
                top: state.view.top,
                left: state.view.left,
            });
        },
        CHANGE_BLOCK: (state, { id, newBlockData }) => {
            state.blocks = state.blocks.map((elem) => {
                if (elem.id == id)
                    return {
                        id,
                        left: state.view.left + newBlockData.left,
                        top: state.view.top + newBlockData.top,
                    };
                return elem;
            });
        },
        ADD_CONNECTION: (state, connection) => {
            state.connections.push({ id: Date.now(), ...connection });
        },
        CHANGE_SIZE: (state, { scale, coords }) => {
            // Определяем старый масштаб
            const oldSize = state.size;

            // Обновляем размер
            state.size = state.size * (1 + scale); // scale может быть положительным или отрицательным

            // Коэффициент изменения размера
            const scaleFactor = state.size / oldSize;

            // Центр масштабирования в глобальных координатах
            const globalCoords = {
                top: coords.top + state.view.top,
                left: coords.left + state.view.left,
            };

            // Пересчет координат всех блоков
            state.blocks = state.blocks.map((block) => {
                const deltaX = block.left - globalCoords.left;
                const deltaY = block.top - globalCoords.top;

                return {
                    ...block,
                    left: globalCoords.left + deltaX * scaleFactor,
                    top: globalCoords.top + deltaY * scaleFactor,
                };
            });
        },
        CHANGE_VIEW: (state, coordinates) => {
            state.view.top -= coordinates.top;
            state.view.left -= coordinates.left;
        },
    },
    actions: {
        addItemToBlocks({ commit }) {
            commit('ADD_ITEM_TO_BLOCKS');
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
