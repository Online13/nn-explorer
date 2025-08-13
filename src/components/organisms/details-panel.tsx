"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";
import { useUI } from "@/src/providers/ui-provider";

export function DetailsPanel() {
    const { details } = useUI();
	return (
		<div className={cn(
            "absolute top-0 right-0 bottom-0 z-20 w-1/5 h-full bg-transparent p-4 transition-transform duration-300",
            details === null && "translate-x-full" 
        )}>
			<Card className="w-full h-full shadow-md">
				<CardHeader>
					<CardTitle>Details</CardTitle>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
		</div>
	);
}
