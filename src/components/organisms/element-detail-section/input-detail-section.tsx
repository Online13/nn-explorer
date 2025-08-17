import {
	ArrowDownLeft,
	AudioLines,
	Fullscreen,
	Image as Img,
	Table,
	Text,
	Video,
} from "lucide-react";
import { useState } from "react";
import { Label } from "../../atoms/label";
import { DataTextForm } from "./data-detail/data-text-form";
import { Separator } from "../../atoms/separator";
import { Chip } from "../../atoms/chip";
import { DataImageForm } from "./data-detail/data-image-form";
import { DataType } from "@/src/data/data";
import { InputData } from "@/src/entities/input";
import { DataVideoForm } from "./data-detail/data-video-form";

const INPUT_DATA: InputData[] = [
	{ active: true, id: DataType.Text, icon: <Text />, label: "Text" },
	{ active: true, id: DataType.Image, icon: <Img />, label: "Image" },
	{ active: false, id: DataType.Video, icon: <Video />, label: "Video" },
	{ active: false, id: DataType.Audio, icon: <AudioLines />, label: "Audio" },
	{
		active: false,
		id: DataType.Vector,
		icon: <ArrowDownLeft />,
		label: "Vector",
	},
	{
		active: false,
		id: DataType.Mixte,
		icon: <Fullscreen />,
		label: "Mixtes",
	},
	{ active: false, id: DataType.Table, icon: <Table />, label: "Table" },
];

export function InputDetailSection() {
	const [selected, setSelected] = useState<DataType | undefined>(
		DataType.Text
	);

	return (
		<div className="w-full py-4 grid gap-2">
			<div className="">
				<Label>Choose an input type :</Label>
				<div className="w-full grid grid-cols-5 gap-2 py-2">
					{INPUT_DATA.map((input) => (
						<Chip
							icon={input.icon}
							key={input.label}
							label={input.label}
							active={input.active}
							selected={selected === input.id}
							onClick={() => setSelected(input.id)}
						/>
					))}
				</div>
			</div>
			<Separator />
			<div className="py-4">
				{selected === DataType.Text ? (
					<DataTextForm />
				) : selected === DataType.Image ? (
					<DataImageForm />
				) : selected === DataType.Video ? (
					<DataVideoForm />
				) : selected === DataType.Audio ? (
					<div>
						<p>Audio input selected</p>
					</div>
				) : selected === DataType.Vector ? (
					<div>
						<p>Vector input selected</p>
					</div>
				) : selected === DataType.Mixte ? (
					<div>
						<p>Mixtes input selected</p>
					</div>
				) : selected === DataType.Table ? (
					<div>
						<p>Table input selected</p>
					</div>
				) : null}
			</div>
		</div>
	);
}
