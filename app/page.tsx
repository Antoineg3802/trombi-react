"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import localforage from "localforage";
import { Trombi } from "@/datas/trombis";
import DisplayModalComponent from "@/components/atoms/DisplayModal";

localforage.config({
	name: "trombisDB",
	storeName: "trombis",
});

export default function Home() {
	const [trombis, setTrombis] = useState<Trombi[]>([]);

	useEffect(() => {
		const loadTrombis = async () => {
			const trombiList: Trombi[] = [];

			await localforage.iterate((value, key) => {
				if (key.startsWith("trombi-")) {
					trombiList.push(value as Trombi);
				}
			});
			setTrombis(trombiList);
		};

		loadTrombis();
	}, []);

	return (
		<div className="h-full w-screen flex p-4 bg-background relative">
			{trombis.length !== 0 ? (
				<div className="h-full w-full">
					<h1 className="text-xl font-bold mb-4">Mes Trombinoscopes</h1>
					<div className="flex flex-wrap gap-4">
						{trombis.map((trombi) => (
							<Link
								key={trombi.nameSimplified}
								className="h-14 w-1/3 text-lg border-blue-700 border-2 rounded-lg p-4 bg-white text-blue-700 hover:bg-blue-700 hover:text-white transition"
								href={`/trombi/${trombi.nameSimplified}`}
							>
								{trombi.name}
							</Link>
						))}
					</div>
				</div>
			) : (
				<div className="h-8 w-1/2 bg-white flex items-center justify-center">
					Aucun trombi trouvé
				</div>
			)}
			<DisplayModalComponent text="Ajouter un trombi" target="trombi" />
		</div>
	);
}
