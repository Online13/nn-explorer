import { ComponentProps, useId } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../atoms/input";


type Props = ComponentProps<typeof Input>

export function SearchBar(props: Props) {
	const id = useId();
	return (
		<div className="relative">
			<Input
				id={id}
				className="peer ps-9 pe-9"
				placeholder="Search..."
				type="search"
				{...props}
			/>
			<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
				<SearchIcon size={16} />
			</div>
		</div>
	);
}
