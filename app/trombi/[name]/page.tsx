"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import localforage from "localforage";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "@/components/atoms/SortableItem";

interface Member {
	id: string;
	name: string;
	image?: string | null;
}

interface Group {
	id: string;
	name: string;
	members: Member[];
}

interface Trombi {
	id: string;
	name: string;
	groups: Group[];
}

localforage.config({
	name: "trombisDB",
	storeName: "trombis",
});

export default function TrombiPage() {
	const params = useParams<{ name: string }>();
	const { name } = params;
	const [trombiData, setTrombiData] = useState<Trombi | null>(null);
	const [newGroupName, setNewGroupName] = useState("");
	const [newMemberName, setNewMemberName] = useState("");
	const [selectedGroupId, setSelectedGroupId] = useState<string>("");
	const [memberPreview, setMemberPreview] = useState<string | null>(null);

	const saveTrombi = async (trombi: Trombi) => {
		await localforage.setItem(`trombi-${name}`, trombi);
	};

	const getTrombi = async (trombiId: string): Promise<Trombi | null> => {
		const trombi = await localforage.getItem<Trombi>(`trombi-${trombiId}`);
		return trombi ?? null;
	};

	useEffect(() => {
		const loadTrombi = async () => {
			const storedTrombi = await getTrombi(name);
			if (storedTrombi) {
				setTrombiData(storedTrombi);
			}
		};
		loadTrombi();
	}, [name]);

	useEffect(() => {
		if (trombiData) {
			saveTrombi(trombiData);
		}
	}, [trombiData]);

	const handleDragEnd = (event: DragEndEvent) => {
		if (!event.active || !event.over || !trombiData) return;
		const { active, over } = event;
		setTrombiData((prev) => {
			if (!prev) return prev;
			const updatedGroups = prev.groups.map((group) => {
				if (group.members.some((member) => member.id === active.id)) {
					const oldIndex = group.members.findIndex(
						(member) => member.id === active.id
					);
					const newIndex = group.members.findIndex(
						(member) => member.id === over.id
					);
					const updatedMembers = Array.from(group.members);
					const [movedItem] = updatedMembers.splice(oldIndex, 1);
					updatedMembers.splice(newIndex, 0, movedItem);
					return { ...group, members: updatedMembers };
				}
				return group;
			});
			return { ...prev, groups: updatedGroups };
		});
	};

	const handleAddGroup = async (e: FormEvent) => {
		e.preventDefault();
		if (!trombiData || !newGroupName.trim()) return;

		const newGroup: Group = {
			id: Date.now().toString(),
			name: newGroupName,
			members: [],
		};

		const updatedTrombi = {
			...trombiData,
			groups: [...trombiData.groups, newGroup],
		};
		setTrombiData(updatedTrombi);
		await saveTrombi(updatedTrombi);
		setNewGroupName("");
	};

	const handleAddMember = async (e: FormEvent) => {
		e.preventDefault();
		if (!trombiData || !selectedGroupId || !newMemberName.trim() || !memberPreview) return;

		const memberId = Date.now().toString();
		const newMember: Member = {
			id: memberId,
			name: newMemberName,
			image: memberPreview,
		};

		const updatedGroups = trombiData.groups.map((group) => {
			if (group.id === selectedGroupId) {
				return { ...group, members: [...group.members, newMember] };
			}
			return group;
		});

		const updatedTrombi = { ...trombiData, groups: updatedGroups };
		setTrombiData(updatedTrombi);
		await saveTrombi(updatedTrombi);

		setNewMemberName("");
		setMemberPreview(null);
	};

	const handleMemberFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0] || null;
		if (selectedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setMemberPreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);
		}
	};

	if (!trombiData) return <div>Aucun trombi trouvé pour {name}</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">{trombiData.name}</h1>

			{/* Formulaire pour ajouter un groupe */}
			<form onSubmit={handleAddGroup} className="flex gap-2 mb-6">
				<input
					type="text"
					placeholder="Nom du groupe"
					value={newGroupName}
					onChange={(e) => setNewGroupName(e.target.value)}
					className="border rounded p-2"
				/>
				<button type="submit" className="bg-blue-500 text-white rounded px-4">
					Ajouter Groupe
				</button>
			</form>

			{/* Formulaire pour ajouter un membre avec upload d'image */}
			<form onSubmit={handleAddMember} className="flex flex-col gap-2 mb-4">
				<div className="flex gap-2">
					<select
						value={selectedGroupId}
						onChange={(e) => setSelectedGroupId(e.target.value)}
						className="border rounded p-2"
					>
						<option value="">Sélectionner le groupe</option>
						{trombiData.groups.map((g) => (
							<option key={g.id} value={g.id}>
								{g.name}
							</option>
						))}
					</select>
					<input
						type="text"
						placeholder="Nom du membre"
						value={newMemberName}
						onChange={(e) => setNewMemberName(e.target.value)}
						className="border rounded p-2"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<input
						type="file"
						accept="image/*"
						onChange={handleMemberFileChange}
						className="border rounded p-2"
					/>
					{memberPreview && (
						<img
							src={memberPreview}
							alt="Prévisualisation"
							className="max-w-[150px] rounded"
						/>
					)}
				</div>
				<button type="submit" className="bg-green-500 text-white rounded px-4">
					Ajouter Membre
				</button>
			</form>

			{trombiData.groups && trombiData.groups.length > 0 ? (
				trombiData.groups.map((group) => (
					<div key={group.id} className="mb-8 border p-4 rounded">
						<h2 className="text-xl font-semibold mb-2">{group.name}</h2>
						<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
							<SortableContext
								items={group.members.map((member) => member.id)}
								strategy={verticalListSortingStrategy}
							>
								{group.members.map((member) => (
									<SortableItem key={member.id} id={member.id}>
										<div className="flex items-center p-2 border rounded mb-2">
											{member.image ? (
												<img
													src={member.image}
													alt={member.name}
													className="max-w-[50px] mr-2"
												/>
											) : (
												<div>Pas d'image</div>
											)}
											<span>{member.name}</span>
										</div>
									</SortableItem>
								))}
							</SortableContext>
						</DndContext>
					</div>
				))
			) : (
				<div className="text-gray-500">
					Aucun groupe. Veuillez ajouter un groupe pour commencer.
				</div>
			)}
		</div>
	);
}
