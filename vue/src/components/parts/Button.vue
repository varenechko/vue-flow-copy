<template>
    <button class="button" @click="onClick">
        <slot />                
    </button>
</template>

<script>
export default {
    name: 'CustomButton',
    props: {
        click: Function, 
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
    },
};
</script>

<style scoped lang="less">
.button {
    height: 40px;
    width: 200px;
    padding: 8px;
    border-radius: 4px;
    border: 2px solid @cBaseThree;
    background: @cBaseTwo;

    font-family: @ffOne;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    color: @cBaseThree;
}
</style>