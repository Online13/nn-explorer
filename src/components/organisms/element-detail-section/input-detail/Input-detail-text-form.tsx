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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../atoms/select";
import { Button } from "../../../atoms/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const inputTextformSchema = z.object({
	max_length: z.number().min(0),
	format: z.string(),
	lang: z.string().min(1),
});

type InputTextFormValues = z.infer<typeof inputTextformSchema>;

export function InputDetailTextForm() {
	const form = useForm<InputTextFormValues>({
		resolver: zodResolver(inputTextformSchema),
	});
	const onSubmit = (data: InputTextFormValues) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 max-w-3xl"
			>
				<div className="mb-4 space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="max_length"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Maximum length</FormLabel>
									<FormControl>
										<Input
											placeholder="512"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Maximum number of characters
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lang"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Language</FormLabel>
									<FormControl>
										<Input placeholder="en" type="" {...field} />
									</FormControl>
									<FormDescription>
										Language code (ISO 639-1)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="format"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Text format</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="text brut" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{["raw text", "tokens", "characters"].map(
											(format) => (
												<SelectItem key={format} value={format}>
													{format}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormDescription>
									How the text is represented
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex items-center justify-end">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
}
