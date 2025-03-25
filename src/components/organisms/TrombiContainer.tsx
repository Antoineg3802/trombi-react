"use client";

import { Trombi } from "@/datas/trombis";
import GroupContainer from "../molecules/GroupContainer";
import DisplayModalComponent from "../atoms/DisplayModal";

interface TrombiContainerProps {
	trombi: Trombi;
}

export default function TrombiContainerComponent({
	trombi,
}: TrombiContainerProps) {
	return (
		<div className="h-full w-full p-4 bg-white flex flex-col space-y-2">
			<h2>{trombi.name}</h2>
			<div className="h-full flex flex-col gap-4">
				{trombi.groups.map((group, index) => (
					<GroupContainer key={index} trombiGroup={group} />
				))}
				<DisplayModalComponent text="Add a group" target="group" />
			</div>
		</div>
	);
}
