"use client";

import "@xyflow/react/dist/style.css";
import {
	ReactFlow,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	type OnNodesChange,
	type OnEdgesChange,
	type OnConnect,
	Background,
	BackgroundVariant,
	MiniMap,
} from "@xyflow/react";
import { PropsWithChildren, useCallback } from "react";
import { useUI } from "@/src/providers/ui-provider";
import { useNodeStore } from "@/src/providers/node-provider";

export function Renderer({ children }: PropsWithChildren) {
	const ui = useUI();
	const nodes = useNodeStore((s) => s.nodes);
	const edges = useNodeStore((s) => s.edges);
	const setNodes = useNodeStore((s) => s.setNodes);
	const setEdges = useNodeStore((s) => s.setEdges);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) =>
			setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[setNodes]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) =>
			setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[setEdges]
	);
	const onConnect: OnConnect = useCallback(
		(params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[setEdges]
	);
	return (
		<div className="w-full h-full bg-[#f2f7fa]">
			<div className="w-full h-full">
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
				>
					<Background variant={BackgroundVariant.Dots} />
					<MiniMap />
					{children}
				</ReactFlow>
			</div>
		</div>
	);
}
