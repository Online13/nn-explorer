"use client";

import { Button } from "../atoms/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../atoms/dialog";
import { ReactNode } from "react";
import { Textarea } from "../atoms/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CodeDialog({ trigger }: { trigger: ReactNode }) {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent className="sm:max-w-[725px]">
					<DialogHeader>
						<DialogTitle>Code source</DialogTitle>
					</DialogHeader>
					<div className="w-full h-full max-h-[60vh] overflow-hidden">
						<ScrollArea className="w-full h-full">
							<Textarea
								value={`
import torch
import torch.nn as nn
import torch.nn.functional as F

class BuiltNet(nn.Module):
    def __init__(self):
        super().__init__()
        # NOTE: in_features must match the previous shape (auto-flattened if needed)
        self.fc1 = nn.Linear(in_features=/* TODO */, out_features=128, bias=true)
        # NOTE: in_features must match the previous shape (auto-flattened if needed)
        self.fc2 = nn.Linear(in_features=/* TODO */, out_features=10, bias=true)
        # NOTE: in_channels must match previous C dimension
        self.conv1 = nn.Conv2d(in_channels=/* TODO */, out_channels=16, kernel_size=3, stride=1, padding=0, bias=true)

    def forward(self, x):
        # x shape starts as: [1, 1, 28, 28]
        # Input layer (no op)
        x = self.fc1(x)
        # shape now ~ ?
        x = F.relu(x)
        # shape now ~ ?
        x = self.fc2(x)
        # shape now ~ ?
        x = F.softmax(x, dim=-1)
        # shape now ~ ?
        # Output layer (pass-through)
        # shape now ~ ?
        # Conv2d conv1
        # TODO: replace in_channels in __init__ and ensure input is NCHW
        x = self.conv1(x)
        # shape now ~ ?
        return x

if __name__ == '__main__':
    model = BuiltNet()
    x = torch.randn([1, 1, 28, 28])
    y = model(x)
    print('Output shape:', tuple(y.shape))`}
								onChange={() => {}}
								className="font-mono border-0 ring-0 ring-offset-0 outline-none pb-40"
							/>
						</ScrollArea>
					</div>
					{/* <DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter> */}
				</DialogContent>
			</form>
		</Dialog>
	);
}
