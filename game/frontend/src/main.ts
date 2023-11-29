import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Game from "./pages/Game.vue";
import BFS from "./pages/BFS/BFS.vue";
import BFSVis from "./pages/BFS/BFSVis.vue";
import BFSGuided from "./pages/BFS/BFSGuided.vue";
import BFSSolo from "./pages/BFS/BFSSolo.vue";
import DFS from "./pages/DFS/DFS.vue";
import DFSVis from "./pages/DFS/DFSVis.vue";
import DFSGuided from "./pages/DFS/DFSGuided.vue";
import DFSSolo from "./pages/DFS/DFSSolo.vue";
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
    {
        path: `${root}/game/dfs`,
        component: DFS,
    },
    {
        path: `${root}/game/dfs/visualise`,
        component: DFSVis,
    },
    {
        path: `${root}/game/dfs/guided`,
        component: DFSGuided,
    },
    {
        path: `${root}/game/dfs/solo`,
        component: DFSSolo,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
