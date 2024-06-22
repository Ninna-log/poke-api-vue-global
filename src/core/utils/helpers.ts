import {
  ActionKeys,
  buttonActions,
  buttonConfig,
} from "@/components/button/button.config";

const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const formatButtons = (btns: ActionKeys[], activeBtn?: ActionKeys) => {
  return btns.map((key) => {
    const actionKey = buttonActions[key];
    return {
      ...buttonConfig[actionKey],
      isActive:
        actionKey === buttonActions[(activeBtn as ActionKeys) ?? btns[0]],
    };
  });
};

export { capitalizeFirstLetter, formatButtons };
