import { ACTIONS } from "@/store/actions/action-types";
import { PokemonPreview, StoreActions } from "../models/pokemon.model";
import store from "@/store";

const apiCalls = async (
  action: StoreActions,
  searchQuery?: string,
  pokemon?: PokemonPreview
) => {
  switch (action) {
    case "all":
      return await store.dispatch(ACTIONS.DO_GET_POKEMONS);
    case "one":
      return await store.dispatch(
        ACTIONS.DO_GET_POKEMON,
        searchQuery?.toLowerCase()
      );
    case "selected":
      return await store.dispatch(
        ACTIONS.DO_GET_SELECTED_POKEMON,
        pokemon?.name.toLowerCase()
      );
    case "favorites":
      return await store.dispatch(ACTIONS.DO_GET_FAVORITE_POKEMONS);
    case "save":
      return await store.dispatch(ACTIONS.DO_SAVE_AS_FAVORITE, pokemon);
    case "clean":
      return store.dispatch(ACTIONS.DO_CLEAN_POKEMONS);
  }
};

export { apiCalls };
