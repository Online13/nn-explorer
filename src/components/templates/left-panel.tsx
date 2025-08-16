"use client";

import { PropsWithChildren } from "react";
import { useElementPage } from "../organisms/element-pager-view";
import { cn } from "@/lib/utils";

export function LeftPanel({ children }: PropsWithChildren) {
	const { data } = useElementPage();
	return (
		<div
			className={cn(
				"w-[380px] h-full flex flex-col p-4 pb-6 gap-2 transition-[width] duration-500",
				data !== null && "w-[540px]"
			)}
		>
			{children}
		</div>
	);
}
