<template>
  <div class="container">
    <loader-component v-if="loading" />
    <div v-else class="content">
      <div class="search-bar">
        <div class="search-bar-background">
          <search-bar-component @searchPokemon="handleSearch" />
        </div>
      </div>
      <error-component v-if="error" @click="toggleView('all')" />
      <div v-else class="container-list">
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
            @click="toggleView(btn.action)"
          />
        </div>
      </div>
      <modal-card-component
        :show="showModal"
        @close="showModal = false"
        @update:make-favorite="makeFavorite"
        :pokemon="selectedPokemon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from "@/components/button/button.component.vue";
import { ActionKeys } from "@/components/button/button.config";
import ItemListComponent from "@/components/item-list.component.vue";
import LoaderComponent from "@/components/loader.component.vue";
import ModalCardComponent from "@/components/modal-card.component.vue";
import SearchBarComponent from "@/components/search-bar.component.vue";
import ErrorComponent from "@/components/error.component.vue";
import { capitalizeFirstLetter, formatButtons } from "@/core/utils/helpers";
import { Pokemon, PokemonPreview } from "@/core/models/pokemon.model";
import { defineComponent, ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { apiCalls } from "@/core/hooks/api-calls-store.config";

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
    const showModal = ref<boolean>(false);
    const selectedPokemon = ref<Pokemon>({} as Pokemon);
    const btnTypes = ref<ActionKeys[]>(["all", "favorites"]);
    const activeBtn = ref<ActionKeys>(btnTypes.value[0]);

    const btns = computed(() => formatButtons(btnTypes.value, activeBtn.value));
    const error = computed(
      () => store.getters.error ?? updatePokemons.value[0] === null
    );

    // returns pokemons based on the active button
    const updatePokemons = computed(() => {
      let pokemons: Pokemon | PokemonPreview[] = [];
      switch (activeBtn.value) {
        case "all":
          return (pokemons = store.getters.pokemons);
        case "favorites":
          return (pokemons = store.getters.favoritePokemons);
        case "one":
          pokemons = [store.getters.pokemon];
          break;
      }
      console.log("UPDATED POKEMONS: " + JSON.stringify(pokemons));
      return pokemons;
    });

    const getPokemons = async () => {
      loading.value = true;
      setTimeout(async () => {
        await apiCalls("all");
        loading.value = false;
      }, 2000);
    };

    // toggles view based on the active button
    const toggleView = (btnAction: ActionKeys) => (activeBtn.value = btnAction);

    const handleSearch = async (searchQuery: string) => {
      if (searchQuery) {
        await apiCalls("one", searchQuery);
        toggleView("one");
      } else {
        activeBtn.value = "all";
      }
    };

    const findPokemon = async (pokemon: PokemonPreview) =>
      await apiCalls("selected", "", pokemon);

    const showPokemonDetail = async (pokemon: PokemonPreview) => {
      await findPokemon(pokemon);
      selectedPokemon.value = {
        ...store.getters.pokemon,
        isFavorite: pokemon.isFavorite,
      };
      showModal.value = true;
    };

    const makeFavorite = async (pokemon: PokemonPreview) => {
      await apiCalls("save", "", pokemon);
      selectedPokemon.value = {
        ...store.getters.pokemon,
        isFavorite: pokemon.isFavorite,
      };
      activeBtn.value = "all";
    };

    const capitalizeLetter = (pokemonName: string) =>
      pokemonName ? capitalizeFirstLetter(pokemonName) : "";

    onBeforeMount(() => getPokemons());

    return {
      loading,
      pokemons: updatePokemons,
      handleSearch,
      showPokemonDetail,
      showModal,
      selectedPokemon,
      btns,
      capitalizeLetter,
      error,
      makeFavorite,
      toggleView,
    };
  },
});
</script>

<style lang="scss" scoped>
$background-color: #f9f9f9;
$footer-background-color: #fff;

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: $background-color;

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
    background-color: $background-color;
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
    background-color: $footer-background-color;
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
}
</style>
