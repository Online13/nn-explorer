"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../atoms/form";
import { Input } from "../../../atoms/input";
import { Button } from "../../../atoms/button";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/src/components/atoms/radio-group";
import { useMemo } from "react";

const CHANNEL_DATA: Record<string, string[]> = {
	grayscale: ["#c0c0c0e0"],
	rgb: ["#ff0000e0", "#00ff00e0", "#0000ffe0"],
	rgba: ["#ff0000e0", "#00ff00e0", "#0000ffe0", "#000000e0"],
};

const schema = z.object({
	height: z.number().min(0),
	width: z.number().min(0),
	channel: z.string(),
	order_dim: z.string(),
});

type Fields = z.infer<typeof schema>;

const defaultValues: Fields = {
	height: 224,
	width: 224,
	channel: "rgb",
	order_dim: "c,h,w",
};

export function DataImageForm() {
	const form = useForm<Fields>({
		defaultValues,
		resolver: zodResolver(schema),
	});
	const onSubmit = (data: Fields) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<ImagePreview />
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 max-w-3xl"
			>
				<div className="grid gap-6">
					<div className="grid grid-cols-2 gap-2">
						<FormField
							control={form.control}
							name="height"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Height (H)</FormLabel>
									<FormControl>
										<Input
											placeholder="224"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Vertical size in pixels
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="width"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Width (W)</FormLabel>
									<FormControl>
										<Input
											placeholder="224"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Horizontal size in pixels
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<FormField
							control={form.control}
							name="channel"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Number of channels</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={field.onChange}
											className="flex flex-row py-4"
										>
											{[
												["Grayscale", "grayscale"],
												["RGB", "rgb"],
												["RGBA", "rgba"],
											].map((option, index) => (
												<FormItem
													className="flex items-center space-x-3 space-y-0"
													key={index}
												>
													<FormControl>
														<RadioGroupItem value={option[1]} />
													</FormControl>
													<FormLabel className="font-normal">
														{option[0]}
													</FormLabel>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="order_dim"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Dimension order</FormLabel>
									<FormControl>
										<RadioGroup
											value={field.value}
											onValueChange={field.onChange}
											className="flex flex-row pt-4"
										>
											{[
												["C,H,W", "c,h,w"],
												["C,W,H", "c,w,h"],
												["H,W,C", "h,w,c"],
											].map((option, index) => (
												<FormItem
													className="flex items-center space-x-3 space-y-0"
													key={index}
												>
													<FormControl>
														<RadioGroupItem value={option[1]} />
													</FormControl>
													<FormLabel className="font-normal">
														{option[0]}
													</FormLabel>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
									<FormDescription>
										How dimensions are organized in the tensor
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className="flex items-center justify-end">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
}

function ImagePreview() {
	const form = useFormContext<Fields>();
	const channel = useWatch({ control: form.control, name: "channel" });
	const width = useWatch({ control: form.control, name: "width" });
	const height = useWatch({ control: form.control, name: "height" });

	const rectSizes = useMemo(() => {
		const maxWidth = 475;
		const maxHeight = 200;
		const scale = Math.min(maxWidth / width, maxHeight / height) * 0.7;
		const scaledWidth = width * scale;
		const scaledHeight = height * scale;
		const left = (maxWidth - scaledWidth) / 2;
		const top = (maxHeight - scaledHeight) / 2;
		return { width: scaledWidth, height: scaledHeight, left, top };
	}, [width, height]);

	return (
		<div className="w-full h-[200px] mb-8 flex justify-center items-center bg-gray-100 rounded-md relative grid-bg">
			{Array.from({
				length: (CHANNEL_DATA[channel] || []).length,
			}).map((_, index) => (
				<div
					key={index}
					className="bg-gray-200 border-2 border-black transition-[width,height,top,left] rounded-md duration-600"
					style={{
						width: `${rectSizes.width}px`,
						height: `${rectSizes.height}px`,
						position: "absolute",
						top: `${rectSizes.top + index * -8}px`,
						left: `${rectSizes.left + index * 8}px`,
						backgroundColor:
							CHANNEL_DATA[channel]?.[index] || "transparent",
					}}
				/>
			))}
		</div>
	);
}

