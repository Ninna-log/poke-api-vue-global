import {
  Pokemon,
  PokemonService,
  PokemonPreview,
} from "@/core/models/pokemon.model";
import { api } from "./axios";
import { END_POINTS } from "@/core/config/urls";

class ApiPokemonService implements PokemonService {
  async getPokemonByName(name: string): Promise<Pokemon> {
    const response = await api.get(`${END_POINTS.getPokemonByName}${name}`);
    return response.data;
  }

  async getPokemonList(): Promise<PokemonPreview[]> {
    const response = await api.get(END_POINTS.getPokemonList);
    return response.data.results;
  }
}

export { ApiPokemonService };
