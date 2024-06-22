<template>
  <transition name="modal">
    <div class="modal-mask" v-if="show" @click="handleMaskClick">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close-container">
            <img
              src="@/assets/close.png"
              alt="Close"
              class="close-icon"
              @click="onClose"
            />
          </div>
          <div class="modal-header">
            <img
              class="background"
              src="@/assets/background.png"
              alt="background"
            />
            <img class="pokemon" v-lazy="pokemonImage" alt="pokemon" />
          </div>

          <div class="modal-content">
            <div class="modal-body">
              <div class="name">
                <img src="@/assets/pokeballs/poke-ball.png" alt="name" />
                <p><strong>Name:</strong> {{ pokemonBody.name }}</p>
              </div>
              <hr />
              <div class="weight">
                <img src="@/assets/power-herb.png" alt="weight" />
                <p><strong>Weight:</strong> {{ pokemonBody.weight }}</p>
              </div>
              <hr />
              <div class="height">
                <img loading="lazy" src="@/assets/scanner.png" alt="height" />
                <p><strong>Height:</strong> {{ pokemonBody.height }}</p>
              </div>
              <hr />
              <div class="types">
                <img loading="lazy" :src="typeImage" alt="type" />
                <p><strong>Types:</strong> {{ pokemonBody.type }}</p>
              </div>
              <hr />
            </div>
            <div class="btn">
              <button-component
                v-for="btn in btns"
                :action="btn.action"
                :is-active="btn.isActive"
                :key="btn.action"
                @click="copyToClipboard"
              />
              <fav-button-component
                :isFavorite="favBtnStatus"
                @update:btn-fav-status="handleFavBtnStatus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUpdate,
  watch,
  toRefs,
  ref,
} from "vue";

import { Pokemon } from "@/core/models/pokemon.model";
import ButtonComponent from "./button/button.component.vue";
import { pokemons, types } from "@/core/config/pokemons-config";
import { pokemonImg } from "@/core/config/constants";
import { ActionKeys } from "./button/button.config";
import FavButtonComponent from "./fav-button/fav-button.component.vue";
import { capitalizeFirstLetter, formatButtons } from "@/core/utils/helpers";

export default defineComponent({
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true,
    },
    bodyScroll: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    ButtonComponent,
    FavButtonComponent,
  },

  emits: ["close", "update:make-favorite"],

  setup(props, { emit }) {
    const { pokemon, show } = toRefs(props);
    const btnTypes = ref<ActionKeys[]>(["share"]);

    const btns = computed(() => formatButtons(btnTypes.value));

    const handleFavBtnStatus = (status: boolean) => {
      emit("update:make-favorite", {
        ...props.pokemon,
        isFavorite: status,
      });
    };

    const favBtnStatus = computed(() => props.pokemon.isFavorite);

    const pokemonImage = computed(() => {
      const img = pokemons[pokemon.value.name as string];
      return img ? `${pokemonImg}${img}.png` : "";
    });

    const typeImage = computed(() => {
      const currentType = pokemon.value.types?.[0]?.type.name ?? "";
      return types[currentType] || "";
    });

    const pokemonBody = computed(() => {
      const { name, weight, height, types } = pokemon.value;

      return {
        name: capitalizeFirstLetter(name as string),
        weight,
        height,
        type: capitalizeFirstLetter(types ? types[0].type.name : ""),
      };
    });

    const onClose = () => {
      document.documentElement.classList.remove("lock-scroll");
      emit("close");
    };

    const handleMaskClick = (event: {
      target: EventTarget | null;
      currentTarget: EventTarget | null;
    }) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    onBeforeUpdate(() => {
      if (show.value) {
        document.documentElement.classList.add("lock-scroll");
      }
    });

    onMounted(() => {
      const handleKeyup = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.body.addEventListener("keyup", handleKeyup);
      return () => {
        document.body.removeEventListener("keyup", handleKeyup);
      };
    });

    watch(show, (newVal) => {
      if (!newVal) {
        document.documentElement.classList.remove("lock-scroll");
      }
    });

    const copyToClipboard = () => {
      const { name, weight, height, types } = pokemon.value;
      const dataString = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${
        types ? types[0].type.name : ""
      }`;
      navigator.clipboard.writeText(dataString);
    };

    return {
      pokemonImage,
      typeImage,
      pokemonBody,
      onClose,
      favBtnStatus,
      handleMaskClick,
      copyToClipboard,
      handleFavBtnStatus,
      btns,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  overflow: auto;
  justify-content: center;
}

.modal-wrapper {
  align-self: center;
  border-radius: 2%;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 55%;
}

.modal-container {
  position: relative;
  text-align: left;
  margin: 0 auto;
  background-color: #fff;
  transition: all 0.3s ease;
  border-radius: 1%;
}

.close-container {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 1050;

  .close-icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
}

.modal-header img {
  overflow: hidden;
  height: 225px;
  border-radius: 1%;
}

.modal-body {
  margin: 10px 50px;
}

.modal-body.scroll {
  overflow-y: auto;
}

.close-container {
  cursor: pointer;
  text-align: right;
  position: absolute;
  z-index: 3;
  right: 40px;
  top: 40px;

  i {
    font-size: 25px;
    color: #fff;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media screen and (max-width: 600px) {
  .modal-wrapper {
    width: 90%;
  }

  .modal-header {
    overflow: hidden;
    width: 100%;
  }

  .modal-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 550px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal-body {
    flex: 1;
    max-height: none;
    margin: 10px 32px;
  }

  .close-container {
    position: absolute;
    right: 16px;
    top: 13px;
  }
}

@media screen and (min-width: 600px) {
  .modal-container {
    width: 420px;
    height: 600px;
  }

  .boton {
    width: 163px;
  }
}

.modal-header {
  display: flex;
  justify-content: center;
}

.pokemon {
  z-index: 3;
  position: absolute;
}

.background {
  z-index: 1;
  position: relative;
}

.types img {
  max-width: 25px;
}

.name,
.weight,
.height,
.types {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  p {
    margin-bottom: inherit;
    padding-left: 8px;
  }
}

.btn {
  display: flex;
  justify-content: space-around;

  button:nth-child(1) {
    width: 190px;
  }
}
</style>
