import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GenerativeType } from "../services/useTranslationsService";
import { LsmTranslationOptions } from "react-lsm";

const defaultValue = {
	"en-US": { hello: "Hello" },
	"es-MX": { hello: "Hola" },
};

const useLocalDatabase = () => {
	const [translations, setTranslations] = useState(defaultValue);
	const [options, setOptions] = useState<LsmTranslationOptions>({});
	const [translationKey, setTranslationKey] = useState("");

	const keys = Object.keys(Object?.values(translations)?.[0] ?? {});

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
		storageTranslations(newTranslations);
	};

	const addKey = (key: string) => {
		const newTranslations = Object.keys(translations).reduce((acc, langKey) => {
			const newTranslation = {
				...(translations[langKey as unknown as never] as object),
				[key]: "",
			};
			return { ...acc, [langKey]: newTranslation };
		}, defaultValue);

		storageTranslations(newTranslations);
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

		storageTranslations(newTranslations);
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

		storageTranslations(newTranslations);
	};

	const removeKey = (key: string) => {
		const newTranslations = Object.keys(translations).reduce((acc, langKey) => {
			const newTranslation = {
				...(translations[langKey as unknown as never] as object),
			};
			delete newTranslation[key as unknown as never];
			return { ...acc, [langKey]: newTranslation };
		}, defaultValue);

		storageTranslations(newTranslations);
	};

	const fillAllLanguageTranslations = async (
		langKey: string,
		generativeType: GenerativeType,
		_newTranslation: object
	) => {
		const _t = retainPropertiesBasedOnStructure(
			_newTranslation,
			translations[langKey as unknown as never]
		);

		let newTranslations;
		if (generativeType === "ONLY_EMPTY_FIELDS") {
			const langTranslation = translations[
				langKey as unknown as never
			] as object;

			newTranslations = {
				...translations,
				[langKey]: {
					...langTranslation,
					..._t,
				},
			};
		} else {
			newTranslations = {
				...translations,
				[langKey]: _t,
			};
		}
		storageTranslations(newTranslations);
	};

	const addTranslationsToALanguage = (
		langKey: string,
		newTranslations: object
	) => {
		const langNewTranslations = {
			...(translations[langKey as unknown as never] as object),
			...newTranslations,
		};

		let newArrayKeys = Object.keys(langNewTranslations);
		const newEmptyValuesObject = newArrayKeys.reduce((acc, key) => {
			return { ...acc, [key]: "" };
		}, {});
		let newTranslationsObject = {
			...translations,
			[langKey]: langNewTranslations,
		};
		const allLanguagesKeys = Object.keys(translations);
		allLanguagesKeys.forEach((lk) => {
			if (lk !== langKey) {
				const langTranslation = translations[lk as unknown as never] as object;
				const newTranslation = {
					...langTranslation,
					...newEmptyValuesObject,
				};
				console.log(newTranslation);
				newTranslationsObject = {
					...newTranslationsObject,
					[lk]: newTranslation,
				};
			}
		});

		storageTranslations(newTranslationsObject);
	};

	const storageTranslations = (newTranslations: object) => {
		localStorage.setItem("translations", JSON.stringify(newTranslations));
		setTranslations({ ...newTranslations } as unknown as any);
	};

	const saveOptions = (newOptions: LsmTranslationOptions) => {
		localStorage.setItem("options", JSON.stringify(newOptions));
		setOptions(newOptions);
	};

	useEffect(() => {
		if (!localStorage.getItem("translations")) {
			localStorage.setItem("translations", JSON.stringify(defaultValue));
		}

		const _translations = JSON.parse(
			localStorage.getItem("translations") ?? "{}"
		);
		setTranslations(_translations);

		if (!localStorage.getItem("options")) {
			localStorage.setItem("options", JSON.stringify({}));
		}
		const _options = JSON.parse(localStorage.getItem("options") ?? "{}");
		setOptions(_options);

		if (!localStorage.getItem("translationKey")) {
			localStorage.setItem("translationKey", "");
		}
		const _translationKey = localStorage.getItem("translationKey") ?? "";
		setTranslationKey(_translationKey);
	}, []);

	const updateTranslationKey = (newKey: string) => {
		localStorage.setItem("translationKey", newKey);
		setTranslationKey(newKey);
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
		addTranslationsToALanguage,
		options,
		setOptions: saveOptions as Dispatch<SetStateAction<LsmTranslationOptions>>,
		saveOptions,
		translationKey,
		setTranslationKey: updateTranslationKey,
		translationsKeys: keys,
	};
};

type AnyObject = { [key: string]: any };

function retainPropertiesBasedOnStructure(
	target: AnyObject,
	reference: AnyObject
) {
	if (
		typeof target !== "object" ||
		target === null ||
		typeof reference !== "object" ||
		reference === null
	) {
		return target;
	}

	const result: AnyObject = {};

	for (const key in reference) {
		if (reference.hasOwnProperty(key)) {
			if (target.hasOwnProperty(key)) {
				if (typeof reference[key] === "object" && reference[key] !== null) {
					result[key] = retainPropertiesBasedOnStructure(
						target[key],
						reference[key]
					);
				} else {
					result[key] = target[key];
				}
			}
		}
	}

	return result;
}

export default useLocalDatabase;
