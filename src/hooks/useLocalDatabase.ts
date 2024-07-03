import { useEffect, useState } from "react";
import { GenerativeType } from "../services/useTranslationsService";

const defaultValue = {
	"en-US": { hello: "Hello" },
	"es-MX": { hello: "Hola" },
};

const useLocalDatabase = () => {
	const [translations, setTranslations] = useState({});

	useEffect(() => {
		if (!localStorage.getItem("translations")) {
			localStorage.setItem("translations", JSON.stringify(defaultValue));
		}
		const _translations = JSON.parse(
			localStorage.getItem("translations") ?? "{}"
		);
		setTranslations(_translations);
	}, []);

	const addLanguage = (langKey: string) => {
		const currentKeys = Object.keys(Object?.values(translations)?.[0] ?? {});
		const newTranslations = {
			...translations,
			[langKey]: {
				...currentKeys.reduce((acc, key) => {
					return { ...acc, [key]: "" };
				}, {}),
			},
		};
		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations({ ...newTranslations });
	};

	const addKey = (key: string) => {
		const newTranslations = Object.keys(translations).reduce((acc, langKey) => {
			const newTranslation = {
				...(translations[langKey as unknown as never] as object),
				[key]: "",
			};
			return { ...acc, [langKey]: newTranslation };
		}, defaultValue);

		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations(newTranslations);
	};

	const updateKey = (oldKey: string, newKeyVal: string) => {
		const newTranslations = Object.keys(translations).reduce((acc, langKey) => {
			let newTranslation = {
				...(translations[langKey as unknown as never] as object),
				[newKeyVal]: translations[langKey as unknown as never][oldKey],
			};
			if (newKeyVal !== oldKey) {
				delete newTranslation[oldKey];
			}

			return { ...acc, [langKey]: newTranslation };
		}, defaultValue);

		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations(newTranslations);
	};

	const addTranslation = (langKey: string, key: string, value: string) => {
		const newTranslations = {
			...translations,
			[langKey]: {
				...(translations[langKey as unknown as never] as object),
				[key]: value,
			},
		};

		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations(newTranslations);
	};

	const removeLanguage = (langKey: string) => {
		const newTranslations = Object.keys(translations).reduce((acc, lk) => {
			if (langKey !== lk) {
				return { ...acc, [lk]: translations[lk as unknown as never] };
			}
			return acc;
		}, defaultValue);

		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations(newTranslations);
	};

	const removeKey = (key: string) => {
		const newTranslations = Object.keys(translations).reduce((acc, langKey) => {
			const newTranslation = {
				...(translations[langKey as unknown as never] as object),
				// [key]: "",
			};
			delete newTranslation[key as unknown as never];
			return { ...acc, [langKey]: newTranslation };
		}, defaultValue);

		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations(newTranslations);
	};

	const fillAllLanguageTranslations = async (
		langKey: string,
		generativeType: GenerativeType,
		_newTranslation: object
	) => {
		for (let i = 0; i < Object.keys(_newTranslation).length; i++) {
			const currentKey = Object.keys(_newTranslation)[i];
			if (
				!Object.keys(translations[langKey as unknown as never]).includes(
					currentKey
				)
			) {
				delete _newTranslation[currentKey as unknown as never];
			}
		}

		let newTranslations;
		if (generativeType === "ONLY_EMPTY_FIELDS") {
			const langTranslation = translations[
				langKey as unknown as never
			] as object;

			newTranslations = {
				...translations,
				[langKey]: {
					...langTranslation,
					..._newTranslation,
				},
			};
		} else {
			newTranslations = {
				...translations,
				[langKey]: _newTranslation,
			};
		}
		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations(newTranslations);
	};

	return {
		translations,
		addLanguage,
		addKey,
		addTranslation,
		removeLanguage,
		removeKey,
		updateKey,
		fillAllLanguageTranslations,
	};
};

export default useLocalDatabase;
