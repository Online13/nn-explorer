"use client";

import "@xyflow/react/dist/style.css";
import {
	ReactFlow,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	type Node,
	type Edge,
	type OnNodesChange,
	type OnEdgesChange,
	type OnConnect,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { useUI } from "@/src/providers/ui-provider";

const initialNodes: Node[] = [
	{ id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
	{ id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];

const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

export function Renderer() {
	const ui = useUI();
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) =>
			setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) =>
			setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[]
	);
	const onConnect: OnConnect = useCallback(
		(params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[]
	);
	return (
		<div className="w-full h-full bg-[#f2f7fa]">
			<div className="w-full h-full grid-bg">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodeClick={() => {
						ui.set("details", {});
					}}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					fitView
				/>
			</div>
		</div>
	);
}
