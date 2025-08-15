"use client";

import { cn } from "@/lib/utils";
import {
	ComponentProps,
	createContext,
	PropsWithChildren,
	useContext,
	useMemo,
	useState,
} from "react";

interface ElementPageData {
	id: string;
}

interface ElementPageContextValue<T> {
	data: T | null;
	page: number;
	goBack: () => void;
	setPage: (page: number, data: T) => void;
}

const ElementPageContext = createContext<
	ElementPageContextValue<ElementPageData> | undefined
>(undefined);

export function ElementPagerView({ children }: PropsWithChildren) {
	const [data, setData] = useState<{
		page: number;
		data: ElementPageData | null;
	}>({
		page: 0,
		data: null,
	});
	const goBack = () =>
		setData((prev) => ({
			...prev,
			data: null,
			page: Math.max(prev.page - 1, 0),
		}));
	const store = useMemo(
		() => ({
			page: data.page,
			data: data.data,
			setPage: (page: number, data: ElementPageData) =>
				setData({ page, data }),
			goBack,
		}),
		[data]
	);
	return (
		<ElementPageContext.Provider value={store}>
			{children}
		</ElementPageContext.Provider>
	);
}

export function ElementPagerViewPage({
	page,
	children,
	...props
}: PropsWithChildren<{ page: number } & ComponentProps<"div">>) {
	const { page: currentPage } = useElementPage();

	return (
		<div
			{...props}
			className={cn("min-w-full h-full", props?.className)}
			ref={(ref) => {
				if (currentPage === page) {
					// We wait until the transition is done
					setTimeout(() => {
						ref?.scrollIntoView({
							behavior: "smooth",
							block: "start",
							inline: "start",
						});
					}, 500);
				}
			}}
		>
			{children}
		</div>
	);
}

export function useElementPage() {
	const context = useContext(ElementPageContext);
	if (!context) {
		throw new Error("useElementPage must be used within an ElementPagerView");
	}
	return context;
}
