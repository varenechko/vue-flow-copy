<template>
    <div class="work-field">
        <MovableBlock
            v-for="block in getBlocks"
            :key="block.id"
            :startLeft="block.left"
            :startTop="block.top"
            :handleMoved="
                (left, top) => {
                    handleBlockMoved(left, top, block.id);
                }
            "
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovableBlock from './MovableBlock.vue';

export default {
    name: 'WorkField',
    components: {
        MovableBlock,
    },
    computed: {
        ...mapGetters('blocks', ['getBlocks']),
    },
    methods: {
        ...mapActions('blocks', ['changeBlockById']),
        handleBlockMoved(left, top, id) {
            this.changeBlockById({ id, newBlockData: { left, top } });
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
