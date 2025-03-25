"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import localforage from "localforage";
import { Trombi } from "@/datas/trombis";
import DisplayModalComponent from "@/components/atoms/DisplayModal";
import { cn } from "@/lib/utils";
import { useModal } from "@/components/providers/ModalProvider";

localforage.config({
	name: "trombisDB",
	storeName: "trombis",
});

export default function Home() {
	const [trombis, setTrombis] = useState<Trombi[]>([]);
	const { isOpen } = useModal();

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
		<div
			className={cn(
				"min-h-screen w-full bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col items-center relative py-12 px-4",
				{ "select-none": isOpen }
			)}
		>
			<header className="mb-12 text-center">
				<h1 className="text-4xl font-extrabold text-gray-800">
					Bienvenue sur My Trombi
				</h1>
				<p className="mt-3 text-lg text-gray-600">
					Découvrez et gérez facilement vos trombinoscopes
				</p>
			</header>

			{trombis.length ? (
				<main className="w-full max-w-6xl px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{trombis.map((trombi) => (
							<Link
								key={trombi.nameSimplified}
								href={!isOpen ? `/trombi/${trombi.nameSimplified}`: {}}
								className={cn(
									"block p-6 bg-white rounded-xl shadow-md border border-transparent transition-colors",
									{
										"hover:cursor-pointer hover:border-blue-500 hover:shadow-lg": !isOpen,
										"hover:cursor-default": isOpen,
									}
								)}
							>
								<h2 className="text-2xl font-semibold text-blue-500">
									{trombi.name}
								</h2>
							</Link>
						))}
					</div>
				</main>
			) : (
				<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center text-gray-700">
					Aucun trombi trouvé
				</div>
			)}

			<div className="fixed bottom-8 right-8">
				<DisplayModalComponent
					text="Ajouter un trombi"
					target="trombi"
				/>
			</div>
		</div>
	);
}
