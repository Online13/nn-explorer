import { Pencil } from "lucide-react";
import { Button } from "../atoms/button";
import { Card } from "../atoms/card";

export function AboutCard() {
	return (
		<Card className="w-full shadow-md flex flex-row justify-between items-center px-6 py-2">
			<div className="w-full  flex flex-row justify-between items-center ">
				<input
					type="text"
					placeholder="Title"
					className="leading-none font-semibold border-0"
				/>
				<Button variant="ghost">
					<Pencil />
				</Button>
			</div>
		</Card>
	);
}
