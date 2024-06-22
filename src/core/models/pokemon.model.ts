/* ------------------------------Pokemon details ------------------------------------ */

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Cry {
  latest: string;
  legacy: string;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface HeldItem {
  item: {
    name: string;
    url: string;
  };
  version_details: {
    rarity: number;
    version: {
      name: string;
      url: string;
    };
  }[];
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    version_group: {
      name: string;
      url: string;
    };
    move_learn_method: {
      name: string;
      url: string;
    };
  }[];
}

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  abilities?: Ability[];
  base_experience?: number;
  cries?: Cry;
  forms?: Form[];
  game_indices?: GameIndex[];
  height: number | null;
  held_items?: HeldItem[];
  id: number | null;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: Move[];
  order?: number;
  past_abilities?: Ability[];
  past_types?: Type[];
  species?: Species;
  sprites?: Sprites;
  stats?: Stat[];
  types: Type[] | null;
  weight: number | null;
  isFavorite: boolean;
  name: string | null;
}

/* ------------------------------Pokemon preview showed on each card ------------------------------------ */
type PokemonPreview = {
  name: string;
  url?: string;
  isFavorite: boolean;
};

interface PokemonsList {
  count: number;
  next: string;
  previous: string;
  results: PokemonPreview[];
}

/*----------------------------- Service definition ------------------------------------ */
interface PokemonService {
  getPokemonList(): Promise<PokemonPreview[]>;
  getPokemonByName(name: string): Promise<Pokemon>;
}

export { PokemonPreview, Pokemon, PokemonsList, PokemonService };
