import {
	ArrowDownLeft,
	AudioLines,
	Fullscreen,
	Image as Img,
	Table,
	Text,
	Video,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Label } from "../../atoms/label";
import { InputDetailTextForm } from "./input-detail/Input-detail-text-form";
import { InputDetailImageForm } from "./input-detail/input-detail-image-form";
import { Separator } from "../../atoms/separator";
import { Chip } from "../../atoms/chip";

enum InputType {
	Text = "text",
	Image = "image",
	Video = "video",
	Audio = "audio",
	Vector = "vector",
	Mixte = "mixte",
	Table = "table",
}

const INPUT_DATA: {
	active: boolean;
	id: InputType;
	icon: ReactNode;
	label: string;
}[] = [
	{ active: true, id: InputType.Text, icon: <Text />, label: "Text" },
	{ active: true, id: InputType.Image, icon: <Img />, label: "Image" },
	{ active: false, id: InputType.Video, icon: <Video />, label: "Video" },
	{ active: false, id: InputType.Audio, icon: <AudioLines />, label: "Audio" },
	{
		active: false,
		id: InputType.Vector,
		icon: <ArrowDownLeft />,
		label: "Vector",
	},
	{
		active: false,
		id: InputType.Mixte,
		icon: <Fullscreen />,
		label: "Mixtes",
	},
	{ active: false, id: InputType.Table, icon: <Table />, label: "Table" },
];

export function InputDetailSection() {
	const [selected, setSelected] = useState<InputType | undefined>(undefined);

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
				{selected === InputType.Text && <InputDetailTextForm />}
				{selected === InputType.Image && <InputDetailImageForm />}
				{selected === InputType.Video && (
					<div>
						<p>Video input selected</p>
					</div>
				)}
				{selected === InputType.Audio && (
					<div>
						<p>Audio input selected</p>
					</div>
				)}
				{selected === InputType.Vector && (
					<div>
						<p>Vector input selected</p>
					</div>
				)}
				{selected === InputType.Mixte && (
					<div>
						<p>Mixtes input selected</p>
					</div>
				)}
				{selected === InputType.Table && (
					<div>
						<p>Table input selected</p>
					</div>
				)}
			</div>
		</div>
	);
}
