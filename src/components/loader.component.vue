<template>
  <div class="loader">
    <img src="@/assets/loader.png" alt="loader" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
});
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  img {
    width: 100px;
    animation: loader 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  }
}

@keyframes loader {
  0%,
  100% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
