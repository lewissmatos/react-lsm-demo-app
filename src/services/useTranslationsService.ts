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
			const apiKey = process.env.OPEN_AI_API_KEY;
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

		This JSON object will have some keys with all values empty
		You will generate a new JSON object with the same keys in the same format, but you will fill in the keys with the ${language} translation.
		To do this, you will get the context of the key that will be in English, and you will fill it with the ${language} translation.
	
		Please use natural language that makes sense to a native speaker of the ${language} language.
	
		- Remember not to generate any new keys. You will only have keys with empty values. You will only fill them values and return the same structure with the same object keys
		- Remember to use the ${language} language for the values.
		- Remember not to use any other language.
		- Remember to use the exact same keys in the same format.
		- The values shouldn't have any typos. Remember to start with Capital letters.
		- Don't use phrases or meaning if not necessary. Use the ${language} translation or interpret the key as a sentence.
	`;

	const improveTranslations = `${promptHead}
		
		This JSON object will have some empty values, others will be filled with the ${language} translation.
		You will generate a new JSON object with the same keys in the same format. 
		You will fill in the empty values with the ${language} translation, taking into account they key so you can infer the value.
		If the value of the key doesn't correspond to the key meaning, you will change the value to the ${language} translation.

		You will also change the values of the keys that are not empty, if you consider that the value can be different and be more natural.
		
		- You will not generate any new keys.
		- Remember to use the ${language} language for the values.
		- Remember not to use any other language.
		- Remember to use the exact same keys in the same format.
		- The values shouldn't have any typos. Remember to start with Capital letters.
		- Don't use phrases or meaning if not necessary. Use the ${language} translation or interpret the key as a sentence.
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
