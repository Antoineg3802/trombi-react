"use client";

import { TrombiMember } from "@/datas/trombis";
import Image from "next/image";

interface CardMemberProps {
	trombiMember: TrombiMember;
}

export default function CardMemberComponent({ trombiMember }: CardMemberProps) {
	return (
		<div className="w-1/2 rounded-md shadow-lg">
			<Image
				className="mx-auto rounded-full"
				src="/profile-picture.png"
				alt="Profile picture"
				width={64}
				height={64}
			/>
			<div className="text-center text-white bg-gray-800 p-4">
				<p>{trombiMember.name}</p>
			</div>
		</div>
	);
}
