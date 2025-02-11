"use client";

import { IconPlus } from "@tabler/icons-react";

interface EmptyMemberProps {
	onclick: () => void;
}

export default function EmptyMemberComponent({ onclick }: EmptyMemberProps) {
	return (
		<div
			className="bg-white w-1/4 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer"
			onClick={onclick}
		>
			<div className="flex justify-center">
				<IconPlus color="#1f2937" size={128} stroke={4} />
			</div>
			<div className="h-full text-center text-white bg-gray-800 p-4">
				<p>Ajouter un membre</p>
			</div>
		</div>
	);
}
