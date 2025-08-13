import { SearchBar } from "../molecules/search-bar";
import { TemplateCard } from "../molecules/template-card";

export function TemplateSection() {
	return (
		<div className="grid gap-4">
			<div className="px-4">
				<SearchBar />
			</div>
			<div className="flex flex-col gap-2">
				<div className="grid grid-cols-1 gap-2 px-4">
					<TemplateCard
						title="Template 1"
						subtitle="Description for template 1"
					/>
					<TemplateCard
						title="Template 2"
						subtitle="Description for template 2"
					/>
					<TemplateCard
						title="Template 3"
						subtitle="Description for template 3"
					/>
				</div>
			</div>
		</div>
	);
}
