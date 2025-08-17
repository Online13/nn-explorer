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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/src/components/atoms/radio-group";

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

export function DataVideoForm() {
    const form = useForm<Fields>({
        defaultValues,
        resolver: zodResolver(schema),
    });
    const onSubmit = (data: Fields) => {
        console.log(data);
    };

    return (
        <Form {...form}>
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

