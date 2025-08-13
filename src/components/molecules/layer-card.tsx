import { Card, CardDescription, CardHeader, CardTitle } from "../atoms/card";

interface Props {
    title: string;
    subtitle: string;
}

export function LayerCard({ title, subtitle }: Props) {
	return (
		<Card className="p-3">
			<CardHeader className="p-0">
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtitle}</CardDescription>
			</CardHeader>
		</Card>
	);
}
