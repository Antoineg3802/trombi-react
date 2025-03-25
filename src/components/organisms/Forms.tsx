// FormComponent.tsx
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

interface FormProps {
	formTheme: "trombi" | "group" | "member";
}

const formSchemaTrombi = z.object({
	name: z.string().min(2).max(50),
	description: z.string().min(2).max(255),
});

const formSchemaGroup = z.object({
	name: z.string().min(2).max(50),
	description: z.string().min(2).max(255),
});

const formMemberGroup = z.object({
	name: z.string().min(2).max(50),
	description: z.string().min(2).max(255),
});

export default function FormComponent({ formTheme }: FormProps) {
	const formTrombi = useForm<z.infer<typeof formSchemaTrombi>>({
		resolver: zodResolver(formSchemaTrombi),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const formGroup = useForm<z.infer<typeof formSchemaGroup>>({
		resolver: zodResolver(formSchemaGroup),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const formMember = useForm<z.infer<typeof formMemberGroup>>({
		resolver: zodResolver(formMemberGroup),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchemaTrombi>) {
		const nameSimplified = values.name.toLowerCase().replace(/ /g, "-");
		const groups: Trombigroup[] = [];
		const newTrombi: Trombi = {
			name: values.name,
			nameSimplified,
			groups,
			description: values.description,
		};

		localStorage.setItem("trombis", JSON.stringify([newTrombi]));
		window.location.href = `/trombi/${nameSimplified}`;
	}
	console.log('there')
	console.log(formTheme)

	switch (formTheme) {
		case "trombi":
			return <TrombiForm form={formTrombi} onSubmit={onSubmit} />;
		case "group":
			return <GroupForm form={formGroup} onSubmit={onSubmit} />;
		case "member":
			return <MemberForm form={formMember} onSubmit={onSubmit} />;
		default:
			return <div></div>;
	}
}

const TrombiForm = ({ form, onSubmit }: { form: any; onSubmit: any }) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h3>Add a trombi</h3>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Firstname</FormLabel>
							<FormControl>
								<Input placeholder="John" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="Web Developer" {...field} />
							</FormControl>
							<FormDescription>
								Describe the post ou la personne en quelques
								mots.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

const GroupForm = ({ form, onSubmit }: { form: any; onSubmit: any }) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h3>Add a group</h3>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Firstname</FormLabel>
							<FormControl>
								<Input placeholder="John" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="Web Developer" {...field} />
							</FormControl>
							<FormDescription>
								Describe the group en quelques mots.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

const MemberForm = ({ form, onSubmit }: { form: any; onSubmit: any }) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h3>Add a member</h3>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Firstname</FormLabel>
							<FormControl>
								<Input placeholder="John" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="Web Developer" {...field} />
							</FormControl>
							<FormDescription>
								Describe the group en quelques mots.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};
