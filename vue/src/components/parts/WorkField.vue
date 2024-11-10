<template>
    <div class="work-field" @pointermove="handlePointerMove">
        <MovableBlock
            v-for="block in getBlocks"
            :key="block.id"
            :data-id="block.id"
            :startLeft="block.left"
            :startTop="block.top"
            :handleMoved="
                (left, top) => {
                    handleBlockMoved(left, top, block.id);
                }
            "
            :handleStartConnection="handleStartConnection"
            :handleEndConnection="handleEndConnection"
        />
        <ConnectionBlock
            v-for="connection in getConnections"
            :key="connection.id"
            :connection="connection"
        />
        <ConnectionBlock
            v-if="this.current.start.blockId"
            :connection="this.current"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovableBlock from './MovableBlock.vue';
import ConnectionBlock from './ConnectionBlock.vue';

export default {
    name: 'WorkField',
    components: {
        MovableBlock,
        ConnectionBlock,
    },
    data() {
        return {
            current: { start: {}, end: {} },
            isPointerDown: false,
        };
    },
    computed: {
        ...mapGetters('blocks', ['getBlocks', 'getConnections']),
    },
    methods: {
        ...mapActions('blocks', ['changeBlockById', 'addConnection']),
        handleBlockMoved(left, top, id) {
            this.changeBlockById({ id, newBlockData: { left, top } });
        },
        handleStartConnection(event) {
            this.current.start = {
                blockId: event.target.offsetParent.dataset.id,
            };
            this.isPointerDown = true;
        },
        handleEndConnection(event) {
            this.current.end = {
                blockId: event.target.offsetParent.dataset.id,
            };
            this.isPointerDown = false;

            this.addConnection(this.current);
            this.current = { start: {}, end: {} };
        },
        handlePointerMove(event) {
            if (this.isPointerDown) {
                this.current = {
                    ...this.current,
                    end: {
                        left: event.pageX,
                        top: event.pageY,
                    },
                };
            }
        },
    },
};
</script>

<style scoped lang="less">
.work-field {
    width: 800px;
    height: 800px;
    border-radius: 10px;
    background-color: @cBaseThree;
}
</style>
