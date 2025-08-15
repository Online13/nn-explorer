"use client";

import { ReactNode } from "react";
import {
	BundledLanguage,
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "../atoms/code-block";
import { toast } from "sonner";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../atoms/sheet";

// // 1) Define formats as data
// type ExportFormat =
// 	| "pytorch"
// 	| "tensorflow"
// 	| "pytorch-lightning"
// 	| "onnx"
// 	| "torchscript"
// 	| "tflite"
// 	| "json"
// 	| "yaml"
// 	| "graphviz";

// type ExportFormatGroup = {
// 	label: string;
// 	items: { value: ExportFormat; label: string }[];
// };

// const EXPORT_FORMAT_GROUPS: ExportFormatGroup[] = [
// 	{
// 		label: "Code",
// 		items: [
// 			{ value: "pytorch", label: "PyTorch (nn.Module)" },
// 			{ value: "tensorflow", label: "TensorFlow / Keras" },
// 			{ value: "pytorch-lightning", label: "PyTorch Lightning" },
// 		],
// 	},
// 	{
// 		label: "Interchange",
// 		items: [
// 			{ value: "onnx", label: "ONNX" },
// 			{ value: "torchscript", label: "TorchScript" },
// 			{ value: "tflite", label: "TensorFlow Lite" },
// 		],
// 	},
// 	{
// 		label: "Configs",
// 		items: [
// 			{ value: "json", label: "JSON (graph + params)" },
// 			{ value: "yaml", label: "YAML (graph + params)" },
// 			{ value: "graphviz", label: "GraphViz DOT" },
// 		],
// 	},
// ];

const code = [
	{
		language: "python",
		filename: "model.py",
		code: `
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
    print('Output shape:', tuple(y.shape))`,
	},
	{
		language: "ts",
		filename: "utils.ts",
		code: `interface Item {
  price: number;
  quantity: number;
}
function calculateTotal(items: Item[]): number {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
    const itemTotal = items[i].price * items[i].quantity;
    total += itemTotal;
  }
  return total;
}`,
	},
];

export function CodeSheet({ trigger }: { trigger: ReactNode }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				{trigger}
			</SheetTrigger>
			<SheetContent className="!max-w-2xl !w-2xl gap-0">
				<SheetHeader>
					<SheetTitle>Generate code</SheetTitle>
				</SheetHeader>
				<CodeBlock
					data={code}
					defaultValue={code[0].language}
					className="h-full overflow-auto"
				>
					<CodeBlockHeader>
						<CodeBlockFiles>
							{(item) => (
								<CodeBlockFilename
									key={item.language}
									value={item.language}
								>
									{item.filename}
								</CodeBlockFilename>
							)}
						</CodeBlockFiles>
						<CodeBlockSelect>
							<CodeBlockSelectTrigger>
								<CodeBlockSelectValue />
							</CodeBlockSelectTrigger>
							<CodeBlockSelectContent>
								{(item) => (
									<CodeBlockSelectItem
										key={item.language}
										value={item.language}
									>
										{item.language}
									</CodeBlockSelectItem>
								)}
							</CodeBlockSelectContent>
						</CodeBlockSelect>
						<CodeBlockCopyButton
							onCopy={async () => {
								toast("Code copied to clipboard", {
									position: "top-center",
									duration: 1200
								});
							}}
							onError={() =>
								console.error("Failed to copy code to clipboard")
							}
						/>
					</CodeBlockHeader>
					<CodeBlockBody>
						{(item) => (
							<CodeBlockItem key={item.language} value={item.language}>
								<CodeBlockContent
									language={item.language as BundledLanguage}
								>
									{item.code}
								</CodeBlockContent>
							</CodeBlockItem>
						)}
					</CodeBlockBody>
				</CodeBlock>
			</SheetContent>
		</Sheet>
	);
}
