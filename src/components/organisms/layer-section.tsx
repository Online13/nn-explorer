import { useMemo, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../atoms/accordion";
import { LayerCard } from "../molecules/layer-card";
import { SearchBar } from "../molecules/search-bar";

const items = [
	{
		key: "io",
		title: "Entrée/Sortie",
		items: [
			{ title: "Input", subtitle: "shape=[1,1,28,28]", tags: ["io"] },
			{ title: "Output", subtitle: "single sink", tags: ["io"] },
			{ title: "Identity", subtitle: "passes input", tags: ["misc"] },
		],
	},
	{
		key: "dense",
		title: "Couches Denses",
		items: [
			{ title: "Linear", subtitle: "out_features", tags: ["dense", "2D"] },
			{
				title: "LazyLinear",
				subtitle: "infers in_features",
				tags: ["dense", "lazy"],
			},
			{
				title: "Embedding",
				subtitle: "num_embeddings · embedding_dim",
				tags: ["nlp"],
			},
			{ title: "Flatten", subtitle: "keep batch", tags: ["shape"] },
			{ title: "Unflatten", subtitle: "spec = dim, sizes", tags: ["shape"] },
			{ title: "Reshape (View)", subtitle: "target=[…]", tags: ["shape"] },
			{ title: "Dropout", subtitle: "p=0.5", tags: ["reg"] },
			{ title: "Dropout1d", subtitle: "p=0.5", tags: ["reg", "1D"] },
			{ title: "Dropout2d", subtitle: "p=0.5", tags: ["reg", "2D"] },
			{ title: "Dropout3d", subtitle: "p=0.5", tags: ["reg", "3D"] },
		],
	},
	{
		key: "acts",
		title: "Activations",
		items: [
			{ title: "ReLU", subtitle: "f(x)=max(0,x)", tags: ["act"] },
			{ title: "LeakyReLU", subtitle: "negative_slope", tags: ["act"] },
			{ title: "PReLU", subtitle: "learnable slope", tags: ["act"] },
			{ title: "ELU", subtitle: "alpha", tags: ["act"] },
			{ title: "SELU", subtitle: "self-normalizing", tags: ["act"] },
			{ title: "GELU", subtitle: "BERT/Transformer", tags: ["act", "nlp"] },
			{ title: "SiLU (Swish)", subtitle: "x·sigmoid(x)", tags: ["act"] },
			{ title: "Mish", subtitle: "x·tanh(softplus)", tags: ["act"] },
			{ title: "Hardswish", subtitle: "MobileNetV3", tags: ["act"] },
			{ title: "Hardsigmoid", subtitle: "approx σ", tags: ["act"] },
			{ title: "Hardtanh", subtitle: "clamp", tags: ["act"] },
			{ title: "Softplus", subtitle: "β ln(1+e^{x})", tags: ["act"] },
			{ title: "Softsign", subtitle: "x / (1+|x|)", tags: ["act"] },
			{ title: "Sigmoid", subtitle: "σ(x)", tags: ["act"] },
			{ title: "Tanh", subtitle: "tanh(x)", tags: ["act"] },
			{ title: "Softmax", subtitle: "dim", tags: ["act"] },
			{ title: "LogSoftmax", subtitle: "dim", tags: ["act"] },
		],
	},
	{
		key: "conv",
		title: "Couches Convolutives",
		items: [
			{
				title: "Conv1d",
				subtitle: "out_channels • k/s/p",
				tags: ["1D", "conv"],
			},
			{
				title: "Conv2d",
				subtitle: "out_channels • k/s/p",
				tags: ["2D", "conv"],
			},
			{
				title: "Conv3d",
				subtitle: "out_channels • k/s/p",
				tags: ["3D", "conv"],
			},
			{
				title: "LazyConv2d",
				subtitle: "infers in_channels",
				tags: ["2D", "conv", "lazy"],
			},
			{
				title: "ConvTranspose1d",
				subtitle: "upsample conv",
				tags: ["1D", "conv"],
			},
			{
				title: "ConvTranspose2d",
				subtitle: "upsample conv",
				tags: ["2D", "conv"],
			},
			{
				title: "ConvTranspose3d",
				subtitle: "upsample conv",
				tags: ["3D", "conv"],
			},
			{
				title: "DepthwiseConv2d",
				subtitle: "groups=in_channels",
				tags: ["2D", "conv"],
			},
			{
				title: "SeparableConv2d",
				subtitle: "depthwise + pointwise",
				tags: ["2D", "conv"],
			},
			{
				title: "Unfold (im2col)",
				subtitle: "kernel_size, stride",
				tags: ["2D", "shape"],
			},
			{
				title: "Fold",
				subtitle: "inverse of Unfold",
				tags: ["2D", "shape"],
			},
		],
	},
	{
		key: "pool",
		title: "Pooling",
		items: [
			{ title: "MaxPool1d", subtitle: "k/s", tags: ["1D", "pool"] },
			{ title: "MaxPool2d", subtitle: "k/s", tags: ["2D", "pool"] },
			{ title: "MaxPool3d", subtitle: "k/s", tags: ["3D", "pool"] },
			{ title: "AvgPool1d", subtitle: "k/s", tags: ["1D", "pool"] },
			{ title: "AvgPool2d", subtitle: "k/s", tags: ["2D", "pool"] },
			{ title: "AvgPool3d", subtitle: "k/s", tags: ["3D", "pool"] },
			{
				title: "AdaptiveAvgPool1d",
				subtitle: "out=…",
				tags: ["1D", "pool"],
			},
			{
				title: "AdaptiveAvgPool2d",
				subtitle: "out=…",
				tags: ["2D", "pool"],
			},
			{
				title: "AdaptiveAvgPool3d",
				subtitle: "out=…",
				tags: ["3D", "pool"],
			},
			{
				title: "AdaptiveMaxPool2d",
				subtitle: "out=…",
				tags: ["2D", "pool"],
			},
			{ title: "LPPool2d", subtitle: "p, k, s", tags: ["2D", "pool"] },
			{
				title: "GlobalAvgPool2d",
				subtitle: "= AdaptAvg2d(1)",
				tags: ["2D", "pool"],
			},
		],
	},
	{
		key: "norm",
		title: "Normalisation",
		items: [
			{
				title: "BatchNorm1d",
				subtitle: "num_features=auto",
				tags: ["norm", "1D"],
			},
			{
				title: "BatchNorm2d",
				subtitle: "num_features=auto",
				tags: ["norm", "2D"],
			},
			{
				title: "BatchNorm3d",
				subtitle: "num_features=auto",
				tags: ["norm", "3D"],
			},
			{
				title: "InstanceNorm1d",
				subtitle: "num_features",
				tags: ["norm", "1D"],
			},
			{
				title: "InstanceNorm2d",
				subtitle: "num_features",
				tags: ["norm", "2D"],
			},
			{
				title: "InstanceNorm3d",
				subtitle: "num_features",
				tags: ["norm", "3D"],
			},
			{ title: "LayerNorm", subtitle: "normalized_shape", tags: ["norm"] },
			{
				title: "GroupNorm",
				subtitle: "num_groups, num_channels",
				tags: ["norm"],
			},
			{
				title: "LocalResponseNorm",
				subtitle: "size, alpha, beta",
				tags: ["norm"],
			},
		],
	},
	{
		key: "seq",
		title: "Récurrents / Séquentiels",
		items: [
			{
				title: "RNN",
				subtitle: "input_size · hidden_size",
				tags: ["nlp", "seq"],
			},
			{
				title: "LSTM",
				subtitle: "input_size · hidden_size",
				tags: ["nlp", "seq"],
			},
			{
				title: "GRU",
				subtitle: "input_size · hidden_size",
				tags: ["nlp", "seq"],
			},
			{
				title: "TransformerEncoderLayer",
				subtitle: "d_model, nhead",
				tags: ["nlp", "attn"],
			},
			{
				title: "TransformerDecoderLayer",
				subtitle: "d_model, nhead",
				tags: ["nlp", "attn"],
			},
			{
				title: "MultiheadAttention",
				subtitle: "embed_dim, num_heads",
				tags: ["attn", "nlp"],
			},
		],
	},
	{
		key: "upsample",
		title: "Upsampling / Autres",
		items: [
			{
				title: "Upsample",
				subtitle: "scale_factor / size",
				tags: ["resize"],
			},
			{
				title: "Interpolate",
				subtitle: "mode='bilinear'",
				tags: ["resize"],
			},
			{
				title: "PixelShuffle",
				subtitle: "upscale_factor",
				tags: ["vision"],
			},
			{
				title: "PixelUnshuffle",
				subtitle: "downscale_factor",
				tags: ["vision"],
			},
			{ title: "ZeroPad2d", subtitle: "pads", tags: ["pad", "2D"] },
			{ title: "ReflectionPad2d", subtitle: "pads", tags: ["pad", "2D"] },
			{ title: "ReplicationPad2d", subtitle: "pads", tags: ["pad", "2D"] },
			{
				title: "ConstantPad1d/2d/3d",
				subtitle: "pads, value",
				tags: ["pad"],
			},
			{ title: "Permute", subtitle: "dims=[…]", tags: ["shape"] },
			{ title: "View", subtitle: "shape=[…]", tags: ["shape"] },
		],
	},
	{
		key: "ops",
		title: "Fusions / Opérations",
		items: [
			{ title: "Add", subtitle: "elementwise", tags: ["op"] },
			{ title: "Concat", subtitle: "dim=1", tags: ["op"] },
			{ title: "Mul", subtitle: "elementwise", tags: ["op"] },
			{ title: "Avg", subtitle: "elementwise", tags: ["op"] },
			{ title: "Max", subtitle: "elementwise", tags: ["op"] },
		],
	},
];

export function LayerSection() {
	const [filter, setFilter] = useState("");
	const filteredItems = useMemo(() => {
		return items.filter((item) =>
			item.items.some((subItem) =>
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
										<LayerCard {...subItem} key={index} />
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
