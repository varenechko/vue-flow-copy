<template>
    <PageLayout>
        <div class="home-page">
            <WorkField />
            <Button @click="handleClickAddItemToBlocks">Добавить блок</Button>
        </div>
    </PageLayout>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '../parts/Button.vue';
import PageLayout from '../parts/PageLayout';
import WorkField from '../parts/WorkField.vue';

export default {
    name: 'HomePage',
    components: {
        WorkField,
        PageLayout,
        Button,
    },
    methods: {
        ...mapActions('blocks', ['addItemToBlocks']),
        handleClickAddItemToBlocks() {
            this.addItemToBlocks({
                left: 0,
                top: 0,
            });
        },
    },
};
</script>

<style>
.home-page {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
}
</style>
