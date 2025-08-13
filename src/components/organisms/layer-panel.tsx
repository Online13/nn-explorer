"use client";
import { Fragment } from "react";
import { Card } from "../atoms/card";
import { Button } from "../atoms/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUI } from "@/src/providers/ui-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs";
import { LayerSection } from "./layer-section";
import { TemplateSection } from "./template-section";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LayerPanel() {
	const { showLayer, set } = useUI();

	return (
		<Fragment>
			<div
				className={cn(
					"absolute top-[100px] left-0 bottom-0 z-20 w-1/5 h-[calc(100vh-100px)] p-4 pt-0 flex flex-col justify-center gap-4 bg-transparent transition-transform duration-300",
					showLayer ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<Card className="w-full h-full overflow-hidden py-0 shadow-md">
					<ScrollArea className="w-full h-full">
						<Tabs defaultValue="layers" className="py-4">
							<TabsList className="px-4">
								<TabsTrigger value="layers">
									Layers
								</TabsTrigger>
								<TabsTrigger value="templates">
									Templates
								</TabsTrigger>
							</TabsList>
							<TabsContent value="layers">
								<LayerSection />
							</TabsContent>
							<TabsContent value="templates">
								<TemplateSection />
							</TabsContent>
						</Tabs>
					</ScrollArea>
				</Card>
			</div>
			<div
				className={cn(
					"absolute top-[100px] z-20 transition-[left] duration-300",
					showLayer ? "left-[calc(100%/5-0.5rem)]" : "left-4"
				)}
			>
				<Button
					variant="outline"
					onClick={() => set("showLayer", !showLayer)}
				>
					{showLayer ? <X /> : <Plus />}
				</Button>
			</div>
		</Fragment>
	);
}
