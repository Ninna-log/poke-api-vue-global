type FavBtnStatus = "fav" | "unfav";

interface FavBtnConfig {
  src: string;
}

const favBtnConfig: Record<FavBtnStatus, FavBtnConfig> = {
  fav: {
    src: "fav-active",
  },
  unfav: {
    src: "fav-inactive",
  },
};

export { favBtnConfig, FavBtnStatus };
