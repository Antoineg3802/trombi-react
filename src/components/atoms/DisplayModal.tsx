import { IconPlus } from "@tabler/icons-react";
import { useModal } from "../providers/ModalProvider";

interface DisplayModalProps {
    text: string;
	target: "trombi" | "group" | "member";
}

export default function DisplayModalComponent({ text, target }: DisplayModalProps) {
	const { showModal } = useModal();

	const handleClick = () => {
		showModal(target);
	}

	return (
		<button className="bg-blue-500 text-white flex items-center justify-center gap-2 transition duration-200 rounded-xl p-4 hover:cursor-pointer" onClick={handleClick}>
			<IconPlus
				stroke={3}
				height={24}
				className="group-hover:rotate-90 transition-all duration-200"
			/>
			{text}
		</button>
	);
}
