"use client";
import { Card } from "../atoms/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs";
import { ElementDetailSection } from "./element-detail-section";
import { ElementPagerViewPage } from "./element-pager-view";
import { LayerSection } from "./layer-section";
import { TemplateSection } from "./template-section";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ElementPanel() {
	return (
		<Card className="w-full h-full overflow-hidden py-0 shadow-md">
			<div className="w-full h-full flex flex-row overflow-hidden">
				<ElementPagerViewPage
					page={0}
					className="w-full h-full grow shrink-0 overflow-hidden"
				>
					<ScrollArea className="w-full shrink-0 h-full">
						<Tabs defaultValue="layers" className="py-4">
							<TabsList className="px-4">
								<TabsTrigger value="layers">Layers</TabsTrigger>
								<TabsTrigger value="templates">Templates</TabsTrigger>
							</TabsList>
							<TabsContent value="layers">
								<LayerSection />
							</TabsContent>
							<TabsContent value="templates">
								<TemplateSection />
							</TabsContent>
						</Tabs>
					</ScrollArea>
				</ElementPagerViewPage>
				<ElementPagerViewPage
					className="w-full h-full grow shrink-0 overflow-hidden"
					page={1}
				>
					<ScrollArea className="w-full shrink-0 h-full">
						<ElementDetailSection />
					</ScrollArea>
				</ElementPagerViewPage>
			</div>
		</Card>
	);
}
