<template>
  <div class="container">
    <loader-component v-if="loading" />
    <div v-else class="content">
      <div class="search-bar">
        <div class="search-bar-background">
          <search-bar-component @searchPokemon="handleSearch" />
        </div>
      </div>
      <error-component v-if="error" @go-list="handleGoList" />
      <div class="container-list" v-else>
        <div class="list">
          <item-list-component
            v-for="pokemon in pokemons"
            :key="pokemon.name"
            :pokemon="{ ...pokemon, name: capitalizeLetter(pokemon.name) }"
            @show-detail="showPokemonDetail"
            @make-favorite="makeFavorite"
          />
        </div>
        <div class="footer">
          <button-component
            class="button"
            v-for="btn in btns"
            :key="btn.label"
            :action="btn.action"
            :is-active="btn.isActive"
            @click="toggleFavorites(btn.action)"
          />
        </div>
      </div>
      <modal-card-component
        :show="showModal"
        @close="onClose"
        @update:make-favorite="makeFavorite"
        :pokemon="selectedPokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from "@/components/button/button.component.vue";
import {
  ActionKeys,
  buttonActions,
  buttonConfig,
} from "@/components/button/button.config";
import ItemListComponent from "@/components/item-list.component.vue";
import LoaderComponent from "@/components/loader.component.vue";
import ModalCardComponent from "@/components/modal-card.component.vue";
import SearchBarComponent from "@/components/search-bar.component.vue";
import ErrorComponent from "@/components/error.component.vue";
import { capitalizeFirstLetter } from "@/core/utils/helpers";
import { Pokemon, PokemonPreview } from "@/core/models/pokemon.model";
import { ACTIONS } from "@/store/actions/action-types";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    LoaderComponent,
    ItemListComponent,
    SearchBarComponent,
    ModalCardComponent,
    ButtonComponent,
    ErrorComponent,
  },

  setup() {
    const store = useStore();
    const loading = ref<boolean>(false);
    const error = ref(false);
    const showModal = ref<boolean>(false);
    const selectedPokemon = ref<Pokemon>({} as Pokemon);
    const showFavorites = ref(false);
    const showPokemon = ref(false);
    const btnTypes = ref<ActionKeys[]>(["all", "favorites"]);
    const activeBtn = ref<ActionKeys>(btnTypes.value[0]);

    const btns = computed(() => {
      return btnTypes.value.map((key) => {
        const actionKey = buttonActions[key];
        return {
          ...buttonConfig[actionKey],
          isActive: actionKey === buttonActions[activeBtn.value],
        };
      });
    });

    const pokemons = computed(() => {
      if (showPokemon.value) {
        return store.getters.pokemon ? [store.getters.pokemon] : [];
      } else if (showFavorites.value) {
        return store.getters.favoritePokemons;
      } else {
        return store.getters.pokemons;
      }
    });

    const getPokemons = async () => {
      loading.value = true;
      setTimeout(async () => {
        await store.dispatch(ACTIONS.DO_GET_POKEMONS);
        loading.value = false;
      }, 2000);
    };

    function toggleFavorites(btn: ActionKeys) {
      activeBtn.value = btn;
      btn === "favorites"
        ? (showFavorites.value = true)
        : (showFavorites.value = false);
      showPokemon.value = false;
    }

    const searchPokemon = async (searchQuery: string) => {
      await store.dispatch(ACTIONS.DO_GET_POKEMON, searchQuery.toLowerCase());
      if (!store.getters.pokemon) {
        error.value = true;
        showPokemon.value = false;
      } else {
        activeBtn.value = store.getters.pokemon ? "one" : "all";
        showPokemon.value = true;
        error.value = false;
      }
    };

    const findPokemonInStore = async (pokemon: PokemonPreview) => {
      await store.dispatch(ACTIONS.DO_GET_SELECTED_POKEMON, pokemon);
    };

    const handleSearch = async (searchQuery: string) => {
      if (searchQuery) {
        searchPokemon(searchQuery);
      } else {
        error.value = false;
        cleanSearch();
      }
    };

    const cleanSearch = () => {
      store.dispatch(ACTIONS.DO_CLEAN_POKEMONS);
      error.value = false;
      showPokemon.value = false;
    };

    const showPokemonDetail = async (pokemon: PokemonPreview) => {
      await findPokemonInStore(pokemon);
      selectedPokemon.value = {
        ...store.getters.pokemon,
        isFavorite: store.getters.pokemon.isFavorite,
      };
      showModal.value = true;
      cleanSearch();
    };

    const makeFavorite = async (pokemon: PokemonPreview) => {
      await store.dispatch(ACTIONS.DO_SAVE_AS_FAVORITE, pokemon);
    };

    const capitalizeLetter = (pokemonName: string) => {
      return pokemonName ? capitalizeFirstLetter(pokemonName) : "";
    };

    const handleGoList = () => {
      error.value = false;
      cleanSearch();
    };

    const onClose = () => (showModal.value = false);

    onBeforeMount(() => getPokemons());

    return {
      loading,
      pokemons,
      searchPokemon,
      handleSearch,
      showPokemonDetail,
      onClose,
      showModal,
      selectedPokemon,
      btns,
      capitalizeLetter,
      error,
      handleGoList,
      makeFavorite,
      toggleFavorites,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: #f9f9f9;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 7%;
  overflow: hidden;
}

.search-bar {
  height: 8%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: #f9f9f9;
  z-index: 1001;
  padding: 16px 0 8px 0;

  @media screen and (max-width: 600px) {
    padding-top: 28px;
  }
}

.container-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 61%;
  box-sizing: border-box;
  position: relative;
  z-index: 500;
  min-height: 110px;
  @media screen and (max-width: 600px) {
    padding-top: 70px;
    width: 115%;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 25px 0;
  background-color: #fff;
  z-index: 500;

  @media screen and (max-width: 600px) {
    padding: 5px;
  }

  .button {
    width: 21%;
    height: 40px;
    margin: auto 45px;

    @media screen and (max-width: 600px) {
      width: 35%;
      height: 50px;
      margin: 10px auto;
    }
  }
}

.button {
  width: 25%;
  height: 40px;
  margin: auto 45px;

  @media screen and (max-width: 600px) {
    width: 38%;
    margin: 10px 15px;
  }
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: lightgrey;
  color: black;
  transition: opacity 0.5s ease;
}
.toast.success {
  background-color: #4caf50;
}
</style>
