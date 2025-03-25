"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import localforage from "localforage";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trombi, Trombigroup } from "@/datas/trombis";

localforage.config({
	name: "trombisDB",
	storeName: "trombis",
});

const formSchemaTrombi = z.object({
	name: z.string().min(2).max(50),
	description: z.string().min(2).max(255),
});

export default function FormComponent() {
	const router = useRouter();
	const formTrombi = useForm<z.infer<typeof formSchemaTrombi>>({
		resolver: zodResolver(formSchemaTrombi),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchemaTrombi>) {
		const nameSimplified = values.name.toLowerCase().replace(/ /g, "-");
		const groups: Trombigroup[] = [];

		const newTrombi: Trombi = {
			name: values.name,
			nameSimplified,
			groups,
			description: values.description,
		};

		await localforage.setItem(`trombi-${nameSimplified}`, newTrombi);
		router.push(`/trombi/${nameSimplified}`);
	}

	return (
		<Form {...formTrombi}>
			<form
				onSubmit={formTrombi.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<h3 className="text-lg font-semibold">Ajouter un Trombi</h3>

				<FormField
					control={formTrombi.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nom du trombinoscope</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Ynov's trombi"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Créer le Trombi
				</Button>
			</form>
		</Form>
	);
}
