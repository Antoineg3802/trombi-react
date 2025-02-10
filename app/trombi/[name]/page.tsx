"use client";

import TrombiContainerComponent from "@/components/organisms/TrombiContainer";
import { Trombi } from "@/datas/trombis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const params = useParams<{ name: string }>();
	const [trombi, setTrombi] = useState<Trombi | null>(null);
	useEffect(() => {
		const trombis: Trombi[] =
			localStorage.getItem("trombis") != null
				? JSON.parse(localStorage.getItem("trombis") as string)
				: [];
		const trombi = trombis.find((trombi) => trombi.nameSimplified === params.name);
		setTrombi(trombi === undefined ? null : trombi);
	}, [!trombi]);
	if (trombi === null) {
		return (
			<div className="h-screen w-screen flex p-4 bg-white relative">
				<div className="h-8 w-1/2 bg-white">pas de trombi</div>
			</div>
		);
	} else {
		return <TrombiContainerComponent trombi={trombi} />;
	}
}
