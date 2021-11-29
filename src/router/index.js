import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Desktop from "../views/Desktop.vue";
import Bitcoins from "../views/Bitcoins.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Desktop",
    name: "Desktop",
    component: Desktop,
  },
  {
    path: "/Bitcoins",
    name: "Bitcoins",
    component: Bitcoins,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
