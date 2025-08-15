import { AboutCard } from "@/src/components/organisms/about-card";
import { ActionBar } from "@/src/components/organisms/action-bar";
import { DetailsPanel } from "@/src/components/organisms/details-panel";
import { ElementPagerView } from "@/src/components/organisms/element-pager-view";
import { ElementPanel } from "@/src/components/organisms/element-panel";
import { Renderer } from "@/src/components/organisms/renderer";
import { LeftPanel } from "@/src/components/templates/left-panel";
import { NodeStoreProvider } from "@/src/providers/node-provider";
import { UIProvider } from "@/src/providers/ui-provider";
import { Panel } from "@xyflow/react";

export default function Home() {
	return (
		<NodeStoreProvider>
			<UIProvider>
				<div className="w-full h-full">
					<Renderer>
						<Panel position="top-center">
							<ActionBar />
						</Panel>
						<Panel position="top-left" className="h-[100vh] p-0 !m-0">
							<ElementPagerView>
								<LeftPanel>
									<AboutCard />
									<ElementPanel />
								</LeftPanel>
							</ElementPagerView>
						</Panel>
						<Panel position="top-right" className="h-[100vh] p-0 !m-0">
							<div className="w-[380px] h-full flex flex-col p-4 pb-6 gap-2">
								<DetailsPanel />
							</div>
						</Panel>
					</Renderer>
				</div>
			</UIProvider>
		</NodeStoreProvider>
	);
}
