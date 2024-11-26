<template>
    <div
        class="work-field"
        ref="field"
        @pointermove="handlePointerMove"
        @wheel="handleScale"
        @pointerdown="handlePointerDown"
        @pointerup="handlePointerUp"
    >
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
            isCreatingConnection: false,
            isMovingField: false,
            moveStartCoordinates: { top: 0, left: 0 },
        };
    },
    computed: {
        ...mapGetters('blocks', ['getBlocks', 'getConnections']),
    },
    methods: {
        ...mapActions('blocks', [
            'changeBlockById',
            'addConnection',
            'changeSize',
            'changeView',
        ]),
        handleBlockMoved(left, top, id) {
            this.changeBlockById({ id, newBlockData: { left, top } });
        },
        handleStartConnection(event) {
            this.current.start = {
                blockId: event.target.offsetParent.dataset.id,
            };
            this.isCreatingConnection = true;
        },
        handleEndConnection(event) {
            this.current.end = {
                blockId: event.target.offsetParent.dataset.id,
            };
            this.isCreatingConnection = false;

            this.addConnection(this.current);
            this.current = { start: {}, end: {} };
        },
        handlePointerMove(event) {
            if (this.isCreatingConnection) {
                this.current = {
                    ...this.current,
                    end: {
                        left: event.pageX,
                        top: event.pageY,
                    },
                };
            } else if (this.isMovingField) {
                this.changeView({
                    left: event.pageX - this.moveStartCoordinates.left,
                    top: event.pageY - this.moveStartCoordinates.top,
                });
            }
        },
        handleScale(event) {
            this.changeSize(event.deltaY * -0.0001);
        },
        handlePointerDown(event) {
            this.isMovingField = true;
            this.moveStartCoordinates = {
                left: event.pageX,
                top: event.pageY,
            };
            this.$refs.field.setPointerCapture(event.pointerId);
        },
        handlePointerUp(event) {
            this.isMovingField = false;
            this.moveStartCoordinates = {
                left: 0,
                top: 0,
            };
            this.$refs.field.releasePointerCapture(event.pointerId);
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
