import React, { useState, ChangeEvent, FormEvent } from "react";
import EmptyMemberComponent from "../atoms/EmptyMember";

interface ImageData {
	image: File;
	nomPrenom: string;
	infosComplementaires: string;
	createdAt: Date;
}

export default function UploadModal() {
	// État pour gérer l'affichage de la modale
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// États pour le formulaire
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [nomPrenom, setNomPrenom] = useState<string>("");
	const [infosComplementaires, setInfosComplementaires] =
		useState<string>("");

	// Gestion de la sélection du fichier image et création d'une prévisualisation
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = e.target.files?.[0] || null;
		if (selectedFile) {
			setFile(selectedFile);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);
		}
	};

	// Fonction pour créer ou ouvrir la base IndexedDB et y stocker les données
	const storeImageData = async (data: ImageData): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			const request: IDBOpenDBRequest = window.indexedDB.open(
				"ImageDB",
				1
			);

			request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
				const db = (e.target as IDBOpenDBRequest).result;
				if (!db.objectStoreNames.contains("images")) {
					db.createObjectStore("images", {
						keyPath: "id",
						autoIncrement: true,
					});
				}
			};

			request.onsuccess = (e: Event) => {
				const db = (e.target as IDBOpenDBRequest).result;
				const transaction = db.transaction("images", "readwrite");
				const store = transaction.objectStore("images");
				const addRequest = store.add(data);

				addRequest.onsuccess = () => resolve();
				addRequest.onerror = (e: Event) => {
					reject((e.target as IDBRequest).error);
				};
			};

			request.onerror = (e: Event) => {
				reject((e.target as IDBOpenDBRequest).error);
			};
		});
	};

	// Gestion de la soumission du formulaire
	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		if (!file) {
			alert("Veuillez sélectionner une image.");
			return;
		}

		const data: ImageData = {
			image: file,
			nomPrenom,
			infosComplementaires,
			createdAt: new Date(),
		};

		try {
			await storeImageData(data);
			console.log("Données sauvegardées dans IndexedDB");
			setFile(null);
			setPreview(null);
			setNomPrenom("");
			setInfosComplementaires("");
			setIsOpen(false);
		} catch (error) {
			console.error("Erreur lors de la sauvegarde :", error);
		}
	};
	if (!isOpen) {
		return <EmptyMemberComponent onclick={() => setIsOpen(true)} />;
	} else {
        return (
            <div className="p-4">
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Déposer une image
                            </h2>
                            <button
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                                onClick={() => setIsOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="image"
                                    className="block text-gray-700 mb-1"
                                >
                                    Image :
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
    
                            {preview && (
                                <div className="mb-4">
                                    <p className="text-gray-700 mb-1">
                                        Prévisualisation :
                                    </p>
                                    <img
                                        src={preview}
                                        alt="Prévisualisation"
                                        className="max-w-full rounded"
                                        style={{ maxWidth: "300px" }}
                                    />
                                </div>
                            )}
    
                            <div className="mb-4">
                                <label
                                    htmlFor="nomPrenom"
                                    className="block text-gray-700 mb-1"
                                >
                                    Nom et Prénom :
                                </label>
                                <input
                                    type="text"
                                    id="nomPrenom"
                                    value={nomPrenom}
                                    onChange={(e) => setNomPrenom(e.target.value)}
                                    placeholder="Votre nom et prénom"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
    
                            <div className="mb-4">
                                <label
                                    htmlFor="infosComplementaires"
                                    className="block text-gray-700 mb-1"
                                >
                                    Informations complémentaires :
                                </label>
                                <textarea
                                    id="infosComplementaires"
                                    value={infosComplementaires}
                                    onChange={(e) =>
                                        setInfosComplementaires(e.target.value)
                                    }
                                    placeholder="Ajoutez des informations complémentaires ici..."
                                    className="w-full p-2 border rounded"
                                />
                            </div>
    
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Enregistrer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
	}
}
