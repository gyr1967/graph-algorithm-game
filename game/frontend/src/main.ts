import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Game from "./pages/Game.vue";
import BFSVis from "./pages/BFS/BFSVis.vue";
import BFSGuided from "./pages/BFS/BFSGuided.vue";
import BFSSolo from "./pages/BFS/BFSSolo.vue";
import DFSVis from "./pages/DFS/DFSVis.vue";
import DFSGuided from "./pages/DFS/DFSGuided.vue";
import DFSSolo from "./pages/DFS/DFSSolo.vue";
import DijkstraVis from "./pages/Dijkstra/DijkstraVis.vue";
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
    {
        path: `${root}/game/dijkstra/visualise`,
        component: DijkstraVis,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
