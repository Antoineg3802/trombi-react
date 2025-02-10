"use client";

import { Trombi } from "@/datas/trombis";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

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
		<div className="h-screen w-screen flex p-4 bg-white relative">
			{trombis.length != 0 ? (
				<div className="h-full w-full">
					<h1 className="text-xl">Mes trombinoscopes</h1>
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
			<Link
				href="/trombi/default"
				className="group absolute right-4 bottom-4 bg-blue-700 text-white p-4 rounded-lg flex items-center space-x-2 hover:bg-blue-500"
			>
				<IconPlus
					stroke={3}
					height={24}
					className="group-hover:rotate-90 transition-all duration-200"
				/>
				Créer un trombinoscope
			</Link>
		</div>
	);
}
