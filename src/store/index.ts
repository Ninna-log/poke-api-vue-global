import { ApiPokemonService } from "@/services/api.pokemon.service";
import { createStore } from "vuex";
import { ACTIONS } from "./actions/action-types";
import { MUTATIONS } from "./mutations/mutation-types";
import { Pokemon, PokemonPreview } from "@/core/models/pokemon.model";

const pokemonService = new ApiPokemonService();

export default createStore({
  state: {
    pokemons: [] as Array<PokemonPreview>,
    favoritePokemons: [] as Array<PokemonPreview>,
    pokemon: {
      name: null,
      height: null,
      id: null,
      types: null,
      weight: null,
      isFavorite: false,
    } as Pokemon | null,
    error: false,
  },

  getters: {
    pokemons: (state) => state.pokemons,
    pokemon: (state) => state.pokemon,
    favoritePokemons: (state) => state.favoritePokemons,
  },

  mutations: {
    [MUTATIONS.ON_GET_POKEMONS](state, pokemons) {
      state.pokemons = pokemons.map((pokemon: PokemonPreview) => ({
        ...pokemon,
        isFavorite: false,
      }));
    },
    [MUTATIONS.ON_GET_POKEMON](state, pokemon) {
      if (pokemon) {
        state.pokemon = {
          name: pokemon.name,
          height: pokemon.height,
          id: pokemon.id,
          types: pokemon.types,
          weight: pokemon.weight,
          isFavorite: false,
        };
      } else {
        state.pokemon = null;
      }
    },
    [MUTATIONS.ON_GET_SELECTED_POKEMON](state, pokemon) {
      const pokemonModified = {
        name: pokemon.name,
        height: pokemon.height,
        id: pokemon.id,
        types: pokemon.types,
        weight: pokemon.weight,
        isFavorite: pokemon.isFavorite,
      };
      state.pokemon = pokemonModified;
    },
    [MUTATIONS.ON_SAVE_AS_FAVORITE](state, pokemon) {
      // Finds the index of the selected pokemon in the pokemons and favoritePokemons array
      const indexAllPokemons = state.pokemons.findIndex(
        (p: PokemonPreview | Pokemon) => p.name === pokemon.name.toLowerCase()
      );
      const indexFavoritePokemons = state.favoritePokemons.findIndex(
        (p) => p.name === pokemon.name.toLowerCase()
      );

      // Checks if the selected pokemon is the same as the one in the store
      const selectedPokemon =
        state.pokemon?.name === pokemon.name.toLowerCase();
      if (selectedPokemon) {
        state.pokemon = {
          ...pokemon,
          isFavorite: pokemon.isFavorite,
        };
      }

      // Updates the specific pokemon in the pokemons array
      if (indexAllPokemons !== -1) {
        state.pokemons[indexAllPokemons] = {
          ...state.pokemons[indexAllPokemons],
          isFavorite: pokemon.isFavorite,
        };
      }

      // If the pokemon is favorite then is added to the favoritePokemons array, otherwise is removed
      if (pokemon.isFavorite) {
        if (indexFavoritePokemons === -1) {
          state.favoritePokemons.push(state.pokemons[indexAllPokemons]);
        }
      } else {
        if (indexFavoritePokemons !== -1) {
          state.favoritePokemons.splice(indexFavoritePokemons, 1);
        }
      }
    },
    [MUTATIONS.ON_GET_FAVORITE_POKEMONS](state) {
      const favoritePokemons = state.pokemons.filter(
        (pokemon: PokemonPreview) => pokemon.isFavorite
      );
      state.favoritePokemons = favoritePokemons;
    },
    [MUTATIONS.ON_ERROR](state, error) {
      state.error = !!error;
    },
  },

  actions: {
    async [ACTIONS.DO_GET_POKEMONS]({ commit }) {
      try {
        const response = await pokemonService.getPokemonList();
        commit(MUTATIONS.ON_GET_POKEMONS, response);
      } catch (error) {
        commit(MUTATIONS.ON_ERROR, error);
      }
    },
    async [ACTIONS.DO_GET_POKEMON]({ commit }, searchQuery) {
      try {
        const response = await pokemonService.getPokemonByName(searchQuery);
        if (response && Object.keys(response).length > 0) {
          commit(MUTATIONS.ON_GET_POKEMON, response);
        } else {
          commit(MUTATIONS.ON_GET_POKEMON, null);
          commit(MUTATIONS.ON_ERROR, true);
        }
      } catch (error) {
        commit(MUTATIONS.ON_GET_POKEMON, null);
        commit(MUTATIONS.ON_ERROR, error);
      }
    },
    async [ACTIONS.DO_GET_SELECTED_POKEMON]({ commit }, pokemon) {
      const response = await pokemonService.getPokemonByName(pokemon);
      commit(MUTATIONS.ON_GET_SELECTED_POKEMON, response);
    },
    async [ACTIONS.DO_CLEAN_POKEMONS]({ commit }) {
      commit(MUTATIONS.ON_GET_POKEMON, null);
    },
    async [ACTIONS.DO_SAVE_AS_FAVORITE]({ commit }, pokemon) {
      commit(MUTATIONS.ON_SAVE_AS_FAVORITE, pokemon);
    },
    async [ACTIONS.DO_GET_FAVORITE_POKEMONS]({ commit }) {
      commit(MUTATIONS.ON_GET_FAVORITE_POKEMONS);
    },
  },
  modules: {},
});
