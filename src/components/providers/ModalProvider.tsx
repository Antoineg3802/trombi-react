"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import FormComponent from "../organisms/Forms";
import { IconX } from "@tabler/icons-react";

interface ModalContextProps {
	isOpen: boolean;
	showModal: (target?: "trombi" | "group" | "member") => void;
	hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	// Par défaut, on affichera le formulaire "trombi"
	const [formTheme, setFormTheme] = useState<"trombi" | "group" | "member">(
		"trombi"
	);

	const showModal = (formThemeInput: "trombi" | "group" | "member" = "trombi") => {
		setFormTheme(formThemeInput);
		setIsOpen(true);
	};

	const hideModal = () => setIsOpen(false);

	return (
		<ModalContext.Provider value={{ isOpen, showModal, hideModal }}>
			{children}
			{isOpen && (
				<div className="absolute w-3/4 h-fit top-4 left-1/2 transform -translate-x-1/2 bottom-4 flex items-center justify-center border-2 border-blue-700 bg-blue-600">
					<div className="h-full w-full relative">
						<FormComponent formTheme={formTheme} />
						<button
							className="absolute top-2 right-2 hover:cursor-pointer"
							onClick={hideModal}
						>
							<IconX stroke={3} height={24} />
						</button>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (context === undefined) {
		throw new Error(
			"useModal doit être utilisé à l'intérieur d'un ModalProvider"
		);
	}
	return context;
};
