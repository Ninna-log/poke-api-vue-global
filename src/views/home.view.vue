<template>
  <div class="container welcome">
    <div class="image">
      <img alt="pikachu" class="pikachu" src="../assets/mask-group.png" />
      <img alt="ellipse" class="ellipse" src="../assets/ellipse-10.png" />
    </div>
    <div class="text">
      <h1 class="title">{{ viewTitle }}</h1>
      <h3 class="subtitle">
        {{ viewSubtitle }}
      </h3>
    </div>
    <div class="button-container">
      <button-component
        class="button"
        v-for="btn in btns"
        :key="btn.label"
        :action="btn.action"
        :is-active="btn.isActive"
        @click="handleActionClick()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ActionKeys } from "@/components/button/button.config";
import ButtonComponent from "@/components/button/button.component.vue";
import { computed, defineComponent, ref } from "vue";
import { formatButtons } from "@/core/utils/helpers";
import router from "@/router";
import { subtitle, title } from "@/core/config/constants";

export default defineComponent({
  components: {
    ButtonComponent,
  },

  setup() {
    const viewTitle = title;
    const viewSubtitle = subtitle;
    const init = ref<ActionKeys[]>(["start"]);

    const btns = computed(() => formatButtons(init.value));

    const handleActionClick = async () =>
      void router.push({
        name: "pokemons-list",
      });

    return { handleActionClick, btns, viewTitle, viewSubtitle };
  },
});
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 88px;

  .image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .pikachu {
      z-index: 3;
      position: absolute;
    }

    .ellipse {
      z-index: 1;
      position: relative;
      padding-top: 56px;
      padding-right: 20px;
    }
  }

  .text {
    text-align: center;
    margin: 20px 0;

    .title,
    .subtitle {
      color: #353535;
      font-size: 26px;
      line-height: 31px;
      margin-top: revert;
      letter-spacing: 0em;
      font-weight: 700;
    }

    .subtitle {
      color: #5e5e5e;
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      margin: 16px 0;
    }
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
