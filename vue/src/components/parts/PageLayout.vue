<template>
    <div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageLayout',
};
</script>

<style scoped lang="less">
.content {
    width: 800px;
}
</style>
