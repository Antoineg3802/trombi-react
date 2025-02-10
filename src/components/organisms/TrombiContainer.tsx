"use client";

import { Trombi } from "@/datas/trombis";
import GroupContainer from "../molecules/GroupContainer";

interface TrombiContainerProps {
	trombi: Trombi;
}

export default function TrombiContainerComponent({
	trombi,
}: TrombiContainerProps) {
	return (
		<div className="h-screen w-screen p-4 bg-white flex flex-col space-y-2">
			<h2>{trombi.name}</h2>
			<div className="h-full flex gap-4">
				{trombi.groups.map((group, index) => (
					<GroupContainer key={index} trombiGroup={group} />
				))}
			</div>
		</div>
	);
}
