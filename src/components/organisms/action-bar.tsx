import { Code, Download, RotateCcw, Upload } from "lucide-react";
import { Button } from "../atoms/button";
import { Card } from "../atoms/card";
import { CodeDialog } from "../molecules/code-dialog";

export function ActionBar() {
	return (
		<Card className="flex flex-row items-center gap-2 px-4 py-2 shadow-md">
			<Button variant="ghost" size="sm">
				<Upload className="h-4 w-4 mr-2" />
				Import
			</Button>
			<Button variant="ghost" size="sm">
				<Download className="h-4 w-4 mr-2" />
				Export
			</Button>
			<CodeDialog
				trigger={
					<Button variant="ghost" size="sm">
						<Code className="h-4 w-4 mr-2" />
						Code
					</Button>
				}
			/>
			<Button variant="ghost" size="sm">
				<RotateCcw className="h-4 w-4 mr-2" />
				Reset
			</Button>
		</Card>
	);
}
