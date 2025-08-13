import { AboutCard } from "@/src/components/organisms/about-card";
import { ActionBar } from "@/src/components/organisms/action-bar";
import { DetailsPanel } from "@/src/components/organisms/details-panel";
import { LayerPanel } from "@/src/components/organisms/layer-panel";
import { Renderer } from "@/src/components/organisms/renderer";
import { UIProvider } from "@/src/providers/ui-provider";

export default function Home() {
	return (
		<UIProvider>
			<div className="w-full h-full">
				<div className="absolute top-[15px] left-1/2 -translate-x-1/2 z-20 bg-transparent">
					<ActionBar />
				</div>
				<div className="absolute top-0 left-0 h-[100px] z-20 w-1/5 bg-transparent px-4 pt-4 pb-3">
					<AboutCard />
				</div>
				<LayerPanel />
				<DetailsPanel />
				<Renderer />
			</div>
		</UIProvider>
	);
}
