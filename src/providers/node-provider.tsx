"use client";

import { useStore } from "zustand";
import { Edge, Node } from "@xyflow/react";
import { createContext, PropsWithChildren, useContext, useRef } from "react";

// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

type NodeState = {
	nodes: Node[];
	edges: Edge[];
};

type NodeActions = {
	addNode: (node: Node) => void;
	removeNode: (id: string) => void;
	addEdge: (edge: Edge) => void;
	removeEdge: (id: string) => void;
	setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
	setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
};

type NodeStore = NodeState & NodeActions;

const defaultInitState: NodeState = {
	nodes: [],
	edges: [],
};

const createNodeStore = (initState: NodeState = defaultInitState) => {
	return createStore<NodeStore>()((set) => ({
		...initState,
		addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
		removeNode: (id) =>
			set((state) => ({ nodes: state.nodes.filter((n) => n.id !== id) })),
		addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
		removeEdge: (id) =>
			set((state) => ({ edges: state.edges.filter((e) => e.id !== id) })),
		setNodes: (nodes) =>
			set((state) => ({
				nodes: typeof nodes === "function" ? nodes(state.nodes) : nodes,
			})),
		setEdges: (edges) =>
			set((state) => ({
				edges: typeof edges === "function" ? edges(state.edges) : edges,
			})),
	}));
};

type NodeStoreContextType = ReturnType<typeof createNodeStore>;

const NodeStoreContext = createContext<NodeStoreContextType | undefined>(
	undefined
);

export function NodeStoreProvider({ children }: PropsWithChildren) {
	const storeRef = useRef<NodeStoreContextType | null>(null);
	if (storeRef.current === null) {
		storeRef.current = createNodeStore();
	}

	return (
		<NodeStoreContext.Provider value={storeRef.current}>
			{children}
		</NodeStoreContext.Provider>
	);
}

export const useNodeStore = <T,>(selector: (store: NodeStore) => T): T => {
	const nodeStoreContext = useContext(NodeStoreContext);
	if (!nodeStoreContext) {
		throw new Error(`useNodeStore must be used within NodeStoreProvider`);
	}

	return useStore(nodeStoreContext, selector);
};
