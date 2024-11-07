<template><div>asdfa</div></template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "MovableBlock",
  computed: {
    ...mapGetters("modals", ["getModals"]),
    showModalContainer() {
      return Object.keys(this.getModals).length;
    },
  },
  methods: {
    ...mapMutations("modals", ["removeModal"]),
    dragStart: (event) => {
      console.log("dragStart", event);
    },
    dragOver: (event) => {
      console.log("dragOver", event);
    },
  },
};
</script>

<style scoped lang="less"></style>
