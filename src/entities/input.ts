import { ReactNode } from "react";
import { DataType } from "../data/data";

export interface InputData {
	active: boolean;
	id: DataType;
	icon: ReactNode;
	label: string;
}

