<template>
  <button class="button" type="button" @click="onClick">
    <img :src="btnSrc" />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { favBtnConfig } from "./fav-button.config";

export default defineComponent({
  props: {
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["update:btn-fav-status"],

  setup(props, { emit }) {
    const btnSrc = computed(() => {
      return require(`@/assets/${
        favBtnConfig[props.isFavorite ? "fav" : "unfav"].src
      }.png`);
    });

    const onClick = (event: MouseEvent) => {
      event.stopPropagation();
      emit("update:btn-fav-status", !props.isFavorite);
    };

    return {
      btnSrc,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.button {
  outline: none;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
</style>
