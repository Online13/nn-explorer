import { ArrowLeft } from "lucide-react";
import { CardHeader, CardTitle } from "../atoms/card";
import { useElementPage } from "./element-pager-view";
import { useMemo } from "react";
import { ELEMENTS } from "@/src/data/element";
import { CONTENTS } from "@/src/data/content";
import { InputDetailSection } from "./element-detail-section/input-detail-section";

export function ElementDetailSection() {
	const element = useElementPage();
	const item = useMemo(() => {
		const data = element.data;
		if (data === null) {
			return null;
		}

		for (const el of ELEMENTS) {
			const item = el.items.find((item) => item.id === data.id);
			if (item !== undefined) {
				return item;
			}
		}

		return null;
	}, [element]);
	const title = useMemo(() => {
		if (item === null) {
			return "";
		}
		return item.title;
	}, [item]);

	const content = useMemo(() => {
		if (item === null) {
			return null;
		}
		const id = item.id;
		if (id === "io-input") {
			return <InputDetailSection />;
		}

		if (id in CONTENTS) {
			return CONTENTS[id];
		}
		return null;
	}, [item]);

	return (
		<CardHeader className="py-4 px-4">
			<CardTitle className="flex items-center gap-2">
				<ArrowLeft onClick={() => element.goBack()} />
				{title}
			</CardTitle>
			{content}
		</CardHeader>
	);
}
