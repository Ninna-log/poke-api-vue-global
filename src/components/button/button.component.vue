<template>
  <button class="button" type="button" :class="{ active: isActive }">
    <img :src="iconPath" alt="Icon" class="button-icon" v-if="iconPath" />
    {{ label }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Actions, buttonActions, buttonConfig } from "./button.config";

export default defineComponent({
  props: {
    action: {
      type: String as () => keyof Actions,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#F22539",
    },
  },

  setup(props) {
    const label = computed(
      () => buttonConfig[buttonActions[props.action]].label
    );
    const iconPath = computed(() => {
      const iconName = buttonConfig[buttonActions[props.action]].icon;
      return iconName ? require(`@/assets/${iconName}.png`) : null;
    });

    return {
      label,
      iconPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 60px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  line-height: 22px;
  cursor: pointer;
  color: #fff;
  background-color: #bfbfbf;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background-color: darken($color: #f22539, $amount: 10%);
  }

  &:active {
    background-color: #c00e20;
    transform: translateY(4px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }

  &.active {
    background-color: #f22539;
  }

  .button-icon {
    margin-right: 10px;
    height: 20px;
    width: auto;
  }
}
</style>
