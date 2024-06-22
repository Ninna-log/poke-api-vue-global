<template>
  <div class="container">
    <div class="content">
      <h1>Uh-oh!</h1>
      <p>You look lost on your journey!</p>
    </div>
    <div class="btn">
      <button-component
        v-for="btn in btns"
        :action="btn.action"
        :key="btn.action"
        :is-active="btn.isActive"
        @click="handleActionClick()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import ButtonComponent from "./button/button.component.vue";
import { ActionKeys } from "./button/button.config";
import { formatButtons } from "@/core/utils/helpers";

export default defineComponent({
  components: {
    ButtonComponent,
  },

  emits: ["go-list"],

  setup(_props, { emit }) {
    const buttons = ref<ActionKeys[]>(["back"]);

    const btns = computed(() => formatButtons(buttons.value));

    const handleActionClick = async () => {
      emit("go-list");
    };

    return {
      buttons,
      handleActionClick,
      btns,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  margin-top: 55px;
}

.btn {
  margin-top: 20px;
  display: flex;
  justify-content: center;

  button {
    width: 160px;
  }
}
</style>
