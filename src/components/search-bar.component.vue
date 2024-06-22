<template>
  <div class="input">
    <input
      ref="input"
      type="text"
      v-model="searchQuery"
      placeholder="Search"
      @keyup.enter="onClickSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import debounce from "lodash.debounce";

export default defineComponent({
  emits: ["searchPokemon"],

  setup(_, { emit }) {
    const searchQuery = ref<string>("");

    const onClickSearch = () => {
      emit("searchPokemon", searchQuery.value);
    };

    watch(
      searchQuery,
      debounce((val: string) => {
        if (val) {
          onClickSearch();
        }
      }, 1500)
    );

    return {
      searchQuery,
      onClickSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.input input {
  width: 42%;
  height: 50px;
  padding: 0 10px 0 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-image: url("@/assets/search.png");
  background-size: 20px 20px;
  background-position: 10px center;
  background-repeat: no-repeat;
  color: #333;
  font-size: 16px;

  &:focus {
    outline: none !important;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }

  @media screen and (max-width: 600px) {
    width: 80%;
  }
}
</style>
