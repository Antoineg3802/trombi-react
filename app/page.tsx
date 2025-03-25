"use client";

import { Trombi } from "@/datas/trombis";
import { useEffect, useState } from "react";
import Link from "next/link";
import DisplayModalComponent from "@/components/atoms/DisplayModal";

export default function Home() {
	const [trombis, setTrombis] = useState<Trombi[]>([]);

	useEffect(() => {
		const trombis: Trombi[] =
			localStorage.getItem("trombis") != null
				? JSON.parse(localStorage.getItem("trombis") as string)
				: [];
		setTrombis(trombis);
	}, [!trombis]);

	return (
		<div className="h-full w-screen flex p-4 bg-background relative">
			{trombis.length != 0 ? (
				<div className="h-full w-full">
					<h1 className="text-xl">My trombinoscops</h1>
					<div className="h-14 w-full flex flex-col gap-4">
						{trombis.map((trombi, index) => (
							<Link
								key={index}
								className="h-full w-1/3 text-lg border-blue-700 border-2 rounded-lg p-4 bg-white text-blue-700 hover:bg-blue-700 hover:text-white"
								href={"/trombi/" + trombi.nameSimplified}
							>
								{trombi.name}
							</Link>
						))}
					</div>
				</div>
			) : (
				<div className="h-8 w-1/2 bg-white">pas de trombi</div>
			)}
			<DisplayModalComponent text="Add a trombi" target="trombi" />
		</div>
	);
}
