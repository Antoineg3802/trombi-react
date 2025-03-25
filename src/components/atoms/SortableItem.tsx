// components/SortableItem.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type SortableItemProps = {
	id: string;
	children: ReactNode;
};

const SortableItem = ({ id, children }: SortableItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} className="w-1/3" style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
};

export default SortableItem;
