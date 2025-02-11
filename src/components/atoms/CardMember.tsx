"use client";

import { TrombiMember } from "@/datas/trombis";
import Image from "next/image";

interface CardMemberProps {
	trombiMember: TrombiMember;
}

export default function CardMemberComponent({ trombiMember }: CardMemberProps) {
	return (
		<div className="bg-white w-1/4 rounded-lg overflow-hidden shadow-lg">
			<Image
				className="mx-auto rounded-full"
				src="/profile-picture.png"
				alt="Profile picture"
				width={128}
				height={128}
			/>
			<div className="h-full text-center text-white bg-gray-800 p-4">
				<p className="text-lg">{trombiMember.name}</p>
				<p className="text-sm">azeazeaz</p>
			</div>
		</div>
	);
}
