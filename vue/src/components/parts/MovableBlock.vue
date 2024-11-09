<template>
    <div
        class="moveable-block"
        ref="block"
        :style="{
            left: currentLeft + 'px',
            top: currentTop + 'px',
            zIndex: zIndex,
        }"
        @pointermove="handlePointerMove"
        @pointerdown="handlePointerDown"
        @pointerup="handlePointerUp"
    ></div>
</template>

<script>
export default {
    name: 'MovableBlock',
    props: {
        startLeft: Number,
        startTop: Number,
        handleMoved: Function,
    },
    data() {
        return {
            currentLeft: this.startLeft,
            currentTop: this.startTop,
            isPointerDown: false,
        };
    },
    computed: {
        zIndex() {
            return this.isPointerDown ? 2 : 1;
        },
    },
    methods: {
        handlePointerDown(event) {
            this.isPointerDown = true;
            this.$refs.block.setPointerCapture(event.pointerId);
        },
        handlePointerUp(event) {
            this.isPointerDown = false;
            this.$refs.block.releasePointerCapture(event.pointerId);
        },
        handlePointerMove(event) {
            event.preventDefault();

            if (this.isPointerDown) {
                this.currentLeft =
                    event.pageX <= 50
                        ? 0
                        : event.pageX > 750
                        ? 700
                        : event.pageX - 50;
                this.currentTop =
                    event.pageY <= 50
                        ? 0
                        : event.pageY > 750
                        ? 700
                        : event.pageY - 50;

                this.handleMoved(this.currentLeft, this.currentTop);
            }
        },
    },
};
</script>

<style scoped lang="less">
.moveable-block {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: @cBaseFive;
    border-radius: 10px;

    &:active {
        background-color: @cBaseFour;
    }
}
</style>
