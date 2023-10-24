import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Game from "./pages/Game.vue";
import BFS from "./pages/BFS.vue";
import "./style.css";

const root = "/graph-algorithm-game";
const routes = [
    {
        path: `${root}/`,
        component: Home,
    },
    {
        path: `${root}/game`,
        component: Game,
    },
    {
        path: `${root}/game/bfs`,
        component: BFS,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
