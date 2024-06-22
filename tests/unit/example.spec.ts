import { shallowMount } from "@vue/test-utils";
import ListView from "@/views/list.view.vue";
import store from "@/store";
import LoaderComponent from "@/components/loader.component.vue";
import ItemListComponent from "@/components/item-list.component.vue";
import FavButtonComponent from "@/components/fav-button/fav-button.component.vue";

describe("ListView", () => {
  it("renders loader when loading is true", async () => {
    const wrapper = shallowMount(ListView, {
      global: {
        plugins: [store],
        mocks: {
          $store: {
            state: {
              loading: true,
            },
          },
        },
      },
    });
    expect(wrapper.findComponent(LoaderComponent).exists()).toBe(true);
  });

  const pokemon = {
    name: "Pikachu",
    isFavorite: false,
  };

  it("renders pokemon name correctly", () => {
    const wrapper = shallowMount(ItemListComponent, {
      props: { pokemon },
    });
    expect(wrapper.text()).toMatch(pokemon.name);
  });

  it("integrates FavButtonComponent correctly and passes isFavorite", () => {
    const wrapper = shallowMount(ItemListComponent, {
      props: { pokemon },
    });
    const favButton = wrapper.findComponent(FavButtonComponent);
    expect(favButton.exists()).toBe(true);
    expect(favButton.props("isFavorite")).toBe(pokemon.isFavorite);
  });
});
