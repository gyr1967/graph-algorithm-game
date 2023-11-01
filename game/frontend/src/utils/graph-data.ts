import { NodeDatas, EdgeDatas } from "../types/GraphData";

export const nodeDatas: NodeDatas = {
    1: {
        A: {
            id: "A",
            x: 50,
            y: 50,
        },
        B: {
            id: "B",
            x: 150,
            y: 50,
        },
        C: {
            id: "C",
            x: 250,
            y: 50,
        },
        D: {
            id: "D",
            x: 200,
            y: 125,
        },
        E: {
            id: "E",
            x: 300,
            y: 125,
        },
        F: {
            id: "F",
            x: 250,
            y: 200,
        },
        G: {
            id: "G",
            x: 150,
            y: 200,
        },
    },
    2: {
        A: {
            id: "A",
            x: 50,
            y: 50,
        },
        B: {
            id: "B",
            x: 150,
            y: 50,
        },
        C: {
            id: "C",
            x: 250,
            y: 50,
        },
        D: {
            id: "D",
            x: 200,
            y: 125,
        },
        E: {
            id: "E",
            x: 300,
            y: 125,
        },
        F: {
            id: "F",
            x: 250,
            y: 200,
        },
        G: {
            id: "G",
            x: 150,
            y: 200,
        },
    },
};

export const linkDatas: EdgeDatas = {
    1: {
        B_C: {
            x1: nodeDatas[1]["B"].x,
            y1: nodeDatas[1]["B"].y,
            x2: nodeDatas[1]["C"].x,
            y2: nodeDatas[1]["C"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
        C_E: {
            x1: nodeDatas[1]["C"].x,
            y1: nodeDatas[1]["C"].y,
            x2: nodeDatas[1]["E"].x,
            y2: nodeDatas[1]["E"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
        A_B: {
            x1: nodeDatas[1]["A"].x,
            y1: nodeDatas[1]["A"].y,
            x2: nodeDatas[1]["B"].x,
            y2: nodeDatas[1]["B"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
        B_D: {
            x1: nodeDatas[1]["B"].x,
            y1: nodeDatas[1]["B"].y,
            x2: nodeDatas[1]["D"].x,
            y2: nodeDatas[1]["D"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
        D_G: {
            x1: nodeDatas[1]["D"].x,
            y1: nodeDatas[1]["D"].y,
            x2: nodeDatas[1]["G"].x,
            y2: nodeDatas[1]["G"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
        D_E: {
            x1: nodeDatas[1]["D"].x,
            y1: nodeDatas[1]["D"].y,
            x2: nodeDatas[1]["E"].x,
            y2: nodeDatas[1]["E"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
        G_F: {
            x1: nodeDatas[1]["G"].x,
            y1: nodeDatas[1]["G"].y,
            x2: nodeDatas[1]["F"].x,
            y2: nodeDatas[1]["F"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
    },
    2: {
        A_B: {
            x1: nodeDatas[2]["A"].x,
            y1: nodeDatas[2]["A"].y,
            x2: nodeDatas[2]["B"].x,
            y2: nodeDatas[2]["B"].y,
            stroke: "#ccc",
            strokeWidth: "2",
        },
    },
};
