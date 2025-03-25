"use client";

import DisplayModalComponent from "@/components/atoms/DisplayModal";
import Form from "@/components/organisms/Forms";
import TrombiContainerComponent from "@/components/organisms/TrombiContainer";
import { useModal } from "@/components/providers/ModalProvider";
import { Trombi } from "@/datas/trombis";
import { IconLoader2 } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const params = useParams<{ name: string }>();
	const [trombi, setTrombi] = useState<Trombi | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { showModal } = useModal();

	useEffect(() => {
		const trombis: Trombi[] =
			localStorage.getItem("trombis") != null
				? JSON.parse(localStorage.getItem("trombis") as string)
				: [];
		const trombi = trombis.find(
			(trombi) => trombi.nameSimplified === params.name
		);
		setTrombi(trombi === undefined ? null : trombi);
		setTimeout(() => setIsLoading(false), 200);
	}, [!trombi]);

	if (isLoading) {
		return (
			<div className="h-screen w-screen flex p-4 relative">
				<IconLoader2 className="h-auto animate-spin absolute top-1/2 left-1/2" height={40} width={40} />
			</div>
		)
	} else {
		return (
			<div className="h-screen w-screen flex p-4 relative">
				{isLoading}
				{trombi === null ? (
					<Form formTheme="trombi" />
				) : (
					<TrombiContainerComponent trombi={trombi} />
				)}
			</div>
		);
	}
}
