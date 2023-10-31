import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Game from "./pages/Game.vue";
import BFS from "./pages/BFS/BFS.vue";
import BFSVis from "./pages/BFS/BFSVis.vue";
import BFSGuided from "./pages/BFS/BFSGuided.vue";
import BFSSolo from "./pages/BFS/BFSSolo.vue";
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
    {
        path: `${root}/game/bfs/visualise`,
        component: BFSVis,
    },
    {
        path: `${root}/game/bfs/guided`,
        component: BFSGuided,
    },
    {
        path: `${root}/game/bfs/solo`,
        component: BFSSolo,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
