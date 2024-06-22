import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueLazyLoad from "vue3-lazy";

const app = createApp(App);

app.use(store);
app.use(router);

app.use(VueLazyLoad, {
  loading: "@/assets/background.png",
  error: "@/assets/vector.png",
});

app.mount("#app");
