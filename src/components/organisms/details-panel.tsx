"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";
import { useUI } from "@/src/providers/ui-provider";

export function DetailsPanel() {
	const { details } = useUI();
	return (
		<Card
			className={cn(
				"w-full h-full shadow-md transition-transform",
				details === null && "translate-x-[calc(100%+1rem)]"
			)}
		>
			<CardHeader>
				<CardTitle>Details</CardTitle>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
