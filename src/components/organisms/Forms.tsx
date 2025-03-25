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

// 🔹 **Initialisation de localForage**
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

	// 🔹 **Initialisation du formulaire avec react-hook-form et zod**
	const formTrombi = useForm<z.infer<typeof formSchemaTrombi>>({
		resolver: zodResolver(formSchemaTrombi),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	// 🔹 **Gestion de la soumission du formulaire**
	async function onSubmit(values: z.infer<typeof formSchemaTrombi>) {
		const nameSimplified = values.name.toLowerCase().replace(/ /g, "-");
		const groups: Trombigroup[] = [];

		const newTrombi: Trombi = {
			name: values.name,
			nameSimplified,
			groups,
			description: values.description,
		};

		// 🔹 **Stockage du trombi dans IndexedDB via localForage**
		await localforage.setItem(`trombi-${nameSimplified}`, newTrombi);

		// 🔹 **Redirection vers la page du trombi**
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
							<FormLabel>Nom du trombi</FormLabel>
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

				<FormField
					control={formTrombi.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Inside organisation in Ynov"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Décrivez brièvement votre trombi.
							</FormDescription>
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
