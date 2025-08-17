"use client";

import { useMemo, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../atoms/accordion";
import { LayerCard } from "../molecules/layer-card";
import { SearchBar } from "../molecules/search-bar";
import { useElementPage } from "./element-pager-view";
import { ELEMENTS } from "@/src/data/element";

export function LayerSection() {
	const element = useElementPage();
	const [filter, setFilter] = useState("");
	const filteredItems = useMemo(() => {
		return ELEMENTS.filter((element) =>
			element.items.some((subItem) =>
				subItem.title.toLowerCase().includes(filter.toLowerCase())
			)
		);
	}, [filter]);

	return (
		<div className="grid gap-4">
			<div className="px-4">
				<SearchBar
					value={filter}
					onChange={(e) => {
						setFilter(e.target.value);
					}}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Accordion type="multiple" className="w-full">
					{filteredItems.map((item) => (
						<AccordionItem
							key={item.key}
							value={item.key}
							className="border-b"
						>
							<AccordionTrigger className="justify-start gap-3 text-[14px] leading-6 hover:no-underline [&>svg]:-order-1 px-4">
								{item.title} ({item.items.length})
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pb-2 px-4">
								<div className="grid gap-2 py-2">
									{item.items.map((subItem, index) => (
										<LayerCard
											{...subItem}
											key={index}
											onClick={() => {
												element.setPage(1, {
													id: subItem.id,
												});
											}}
										/>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
			<div className="h-[200px]"></div>
		</div>
	);
}
