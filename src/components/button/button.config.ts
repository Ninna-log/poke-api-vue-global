const buttonActions = {
  start: "get_started",
  back: "go_back_home",
  all: "show_all_pokemons",
  favorites: "show_favorite_pokemons",
  share: "share_to_my_friends",
  one: "show_only_one_pokemon",
};

type Actions = typeof buttonActions;
type ConfigKeys = Actions[keyof Actions];
type ActionKeys = keyof Actions;

interface ButtonConfig {
  label: string;
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
  show_all_pokemons: {
    label: "All",
    icon: "all",
    isActive: false,
    action: "all",
  },
  show_favorite_pokemons: {
    label: "Favorites",
    icon: "star",
    isActive: false,
    action: "favorites",
  },
  share_to_my_friends: {
    label: "Share to my friend",
    isActive: true,
    action: "share",
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
