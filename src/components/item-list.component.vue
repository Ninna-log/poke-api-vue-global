<template>
  <div class="row" @click="onOpen">
    <div class="col">
      <h2>{{ pokemonName }}</h2>
    </div>
    <div class="col">
      <fav-button-component
        :isFavorite="favBtnStatus"
        @update:btn-fav-status="handleFavBtnStatus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import FavButtonComponent from "@/components/fav-button/fav-button.component.vue";
import { PokemonPreview } from "@/core/models/pokemon.model";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    pokemon: {
      type: Object as () => PokemonPreview,
      required: true,
    },
  },

  components: {
    FavButtonComponent,
  },

  emits: ["show-detail", "make-favorite"],

  setup(props, { emit }) {
    const favBtnStatus = ref<boolean>(props.pokemon.isFavorite);

    const handleFavBtnStatus = (status: boolean) => {
      favBtnStatus.value = status;
      emit("make-favorite", {
        ...props.pokemon,
        isFavorite: status,
      });
    };

    const pokemonName = computed(() => {
      return props.pokemon.name;
    });

    const onOpen = () => {
      emit("show-detail", props.pokemon);
    };

    return {
      pokemonName,
      onOpen,
      favBtnStatus,
      handleFavBtnStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: #fff;
  margin-top: 25px;
  box-shadow: 0 1px 8px 0 rgba(18, 18, 18, 0.2);
  height: 70px;
  padding-left: 28px;
  width: 66%;

  div:nth-child(2) {
    z-index: 10;
  }

  &:hover {
    transform: scale(1.01);
  }
}

.col {
  width: 100px;
}
</style>
