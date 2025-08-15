import { Card, CardDescription, CardHeader, CardTitle } from "../atoms/card";

interface Props {
	title: string;
	subtitle: string;
	onClick: () => void;
}

export function LayerCard({ title, subtitle, onClick }: Props) {
	return (
		<Card className="p-3 border-border/55 cursor-pointer hover:border-primary" onClick={onClick}>
			<CardHeader className="p-0">
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtitle}</CardDescription>
			</CardHeader>
		</Card>
	);
}
