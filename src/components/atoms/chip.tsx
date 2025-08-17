import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { ReactNode } from "react";

interface Props {
	label: string;
	active?: boolean;
	icon: ReactNode;
	selected: boolean;
	onClick: () => void;
}

export function Chip({
	selected,
	onClick,
	icon,
	active = false,
	label,
}: Props) {
	return (
		<Card
			className={cn(
				"py-0 cursor-pointer border-2",
				selected && "border-2 text-primary border-primary",
				!active &&
					"border-2 border-muted text-muted-foreground/50 cursor-not-allowed"
			)}
			onClick={() => {
				if (!active) {
					return;
				}

				onClick();
			}}
		>
			<CardContent className="px-0 py-2 flex flex-row justify-center items-center gap-2">
				<div className={cn(!active && "text-muted-foreground/50")}>
					{icon}
				</div>
				<div className="">
					<h5 className="text-sm">{label}</h5>
				</div>
			</CardContent>
		</Card>
	);
}
