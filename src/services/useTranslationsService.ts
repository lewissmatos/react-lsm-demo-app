import axios from "axios";
import { useState } from "react";

const useTranslationsService = () => {
	const [isLoading, setIsLoading] = useState(false);

	const generateEmptyTranslations = async (
		language: string,
		generativeType: GenerativeType,
		JSONObject: object
	) => {
		try {
			setIsLoading(true);

			const apiUrl = "https://api.openai.com/v1/chat/completions";
			const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			};

			const prompt = handlePromptSend(generativeType, language);

			const objectToTranslate = handleObjectToTranslate(
				generativeType,
				JSONObject
			);

			const requestBody = {
				model: "gpt-3.5-turbo",
				response_format: { type: "json_object" },
				messages: [
					{
						role: "user",
						content: `${prompt} 
						This is the JSON object you take: 
						
						${JSON.stringify(objectToTranslate)} `,
					},
				],
			};

			const { data } = await axios.post(apiUrl, requestBody, { headers });

			const newObject = JSON.parse(data.choices[0].message.content);

			setIsLoading(false);
			return {
				data: newObject,
				isSuccess: true,
			};
		} catch (error) {
			setIsLoading(false);
			console.error("Error sending message:", error);
			throw error;
		}
	};

	return { generateEmptyTranslations, isLoading };
};

const promptHead = ` You are a translator AI that can translate text from one language to another.
        The language you are translating from a JSON object with some keys in English that my be using a notation in: camelCase, snake_case, PascalCase, or kebab-case.
       `;

export type GenerativeType =
	| "ONLY_EMPTY_FIELDS"
	| "IMPROVE_AND_FILL_TRANSLATIONS";

const handlePromptSend = (generativeType: GenerativeType, language: string) => {
	const onlyEmptyFields = `${promptHead}

		This JSON object will have some keys with empty values.
		You will generate a new JSON object with the same keys and structure, filling the empty values with the ${language} translation of their respective keys.
		To do this, translate the key from English to ${language} and use the translation as the value.
		
		Instructions:
		- Do not generate any new keys.
		- Do not change the structure of the object.
		- Do not infer meaning or generate additional content from the key.
		- Use the ${language} translation of the key as the value.
		- Ensure the values have correct capitalization and no typos.
		- Only use the ${language} for the values.
		- Translate the key into a natural and appropriate ${language} value (e.g., "brandNew" should be translated as "Totalmente nuevo" in Spanish).

		`;

	const improveTranslations = `${promptHead}

		This JSON object will have some empty values and others filled with the ${language} translation.
		You will generate a new JSON object with the same keys and structure.
		Your tasks are as follows:
		
		1. Fill the empty values with the ${language} translation of their respective keys. Translate the key from English to ${language} and use this translation as the value.
		2. Review the non-empty values:
		   - If a value does not correspond accurately to the key, replace it with the correct ${language} translation.
		   - If a value can be improved to sound more natural, update it accordingly.
		
		Instructions:
		- Do not generate any new keys.
		- Do not change the structure of the object.
		- Use only the ${language} for the values.
		- Ensure the values have correct capitalization and no typos.
		- Use the exact same keys in the same format.
		- Do not infer additional meaning or generate extra content from the key.
		- Only use the ${language} translation as the value.
		- Translate the key into a natural and appropriate ${language} value (e.g., "brandNew" should be translated as "Totalmente nuevo" in Spanish).
		- Also, if the value is correct but misspelled, correct it. For example Capitalization matters, and stuff.
		`;

	const prompts = {
		ONLY_EMPTY_FIELDS: onlyEmptyFields,
		IMPROVE_AND_FILL_TRANSLATIONS: improveTranslations,
	};

	return prompts[generativeType as keyof typeof prompts];
};

const handleObjectToTranslate = (
	generativeType: GenerativeType,
	objectToTranslate: object
) => {
	const formatters = {
		IMPROVE_AND_FILL_TRANSLATIONS: objectToTranslate,
		ONLY_EMPTY_FIELDS: (() => {
			const keyOfEmptyValues = Object.keys(objectToTranslate).filter(
				(key) => objectToTranslate[key as keyof typeof objectToTranslate] === ""
			);
			// create a new object only with the keys that have empty values
			const newObject = Object.fromEntries(
				keyOfEmptyValues.map((key) => [key, ""])
			);
			return newObject;
		})(),
	};

	const formattedObject = formatters[generativeType as unknown as never];

	return formattedObject;
};

export default useTranslationsService;
