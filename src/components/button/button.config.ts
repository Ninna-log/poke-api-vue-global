const buttonActions = {
  start: "get_started",
  back: "go_back_home",
  all: "get_all_pokemons",
  favorites: "get_favorite_pokemons",
  share: "share_to_my_friend",
  one: "get_only_one_pokemon",
};

type Actions = typeof buttonActions;
type ConfigKeys = Actions[keyof Actions];
type ActionKeys = keyof Actions;

interface ButtonConfig {
  label?: string;
  icon?: string;
  action: ActionKeys;
  isActive: boolean;
}

interface ButtonStates {
  [key: string]: ButtonConfig;
}

const buttonConfig: Record<ConfigKeys, ButtonConfig> = {
  get_started: {
    label: "Get Started",
    isActive: true,
    action: "start",
  },
  go_back_home: {
    label: "Go back home",
    isActive: true,
    action: "back",
  },
  get_all_pokemons: {
    label: "All",
    icon: "all",
    isActive: false,
    action: "all",
  },
  get_favorite_pokemons: {
    label: "Favorites",
    icon: "star",
    isActive: false,
    action: "favorites",
  },
  share_to_my_friend: {
    label: "Share to my friend",
    isActive: true,
    action: "share",
  },
  get_only_one_pokemon: {
    isActive: false,
    action: "one",
  },
};

export {
  buttonConfig,
  buttonActions,
  Actions,
  ConfigKeys,
  ActionKeys,
  ButtonStates,
  ButtonConfig,
};
