import { NodeData, EdgeData } from "../types/Graph";

export const nodeData: NodeData[] = [
    {
        id: "A",
        x: 50,
        y: 50,
    },
    {
        id: "B",
        x: 150,
        y: 50,
    },
    {
        id: "C",
        x: 250,
        y: 50,
    },
    {
        id: "D",
        x: 200,
        y: 125,
    },
    {
        id: "E",
        x: 300,
        y: 125,
    },
    {
        id: "F",
        x: 250,
        y: 200,
    },
    {
        id: "G",
        x: 150,
        y: 200,
    },
];

const nodeDataObj = {
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
};

export const linkData: EdgeData[] = [
    {
        x1: nodeDataObj["B"].x,
        y1: nodeDataObj["B"].y,
        x2: nodeDataObj["C"].x,
        y2: nodeDataObj["C"].y,
        stroke: "#ccc",
        strokeWidth: "2",
    },
    {
        x1: nodeDataObj["C"].x,
        y1: nodeDataObj["C"].y,
        x2: nodeDataObj["E"].x,
        y2: nodeDataObj["E"].y,
        stroke: "#ccc",
        strokeWidth: "2",
    },
    {
        x1: nodeDataObj["A"].x,
        y1: nodeDataObj["A"].y,
        x2: nodeDataObj["B"].x,
        y2: nodeDataObj["B"].y,
        stroke: "#ccc",
        strokeWidth: "2",
    },
    {
        x1: nodeDataObj["B"].x,
        y1: nodeDataObj["B"].y,
        x2: nodeDataObj["D"].x,
        y2: nodeDataObj["D"].y,
        stroke: "#ccc",
        strokeWidth: "2",
    },
    {
        x1: nodeDataObj["D"].x,
        y1: nodeDataObj["D"].y,
        x2: nodeDataObj["G"].x,
        y2: nodeDataObj["G"].y,
        stroke: "#ccc",
        strokeWidth: "2",
    },
    {
        x1: nodeDataObj["D"].x,
        y1: nodeDataObj["D"].y,
        x2: nodeDataObj["E"].x,
        y2: nodeDataObj["E"].y,
        stroke: "#ccc",
        strokeWidth: "2",
    },
    {
        x1: nodeDataObj["G"].x,
        y1: nodeDataObj["G"].y,
        x2: nodeDataObj["F"].x,
        y2: nodeDataObj["F"].y,
        stroke: "#ccc",
        strokeWidth: "2",
    },
];
