import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Spinner,
	Tooltip,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import DownloadAsJSONButton from "./DownloadAsJSONButton";
import { useLsmTranslation } from "react-lsm";
import useTranslationsService, {
	GenerativeType,
} from "../../services/useTranslationsService";
import UploadJSONButton from "./UploadJSONButton";

type TranslationValueInputProps = {
	langKey: string;
	defaultValue: string;
	addTranslation: (langKey: string, key: string, value: string) => void;
	propKey: string;
};

const TranslationValueInput: FC<TranslationValueInputProps> = ({
	langKey,
	defaultValue,
	addTranslation,
	propKey,
}) => {
	const [inputValue, setInputValue] = useState(defaultValue);

	useEffect(() => {
		setInputValue(defaultValue);
	}, [defaultValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};
	return (
		<Tooltip content={inputValue}>
			<Input
				value={inputValue}
				onChange={handleChange}
				placeholder={`${langKey} Value`}
				endContent={
					<Button
						variant="light"
						color="primary"
						isIconOnly
						size="sm"
						className={
							inputValue.length > 0 && inputValue !== defaultValue
								? ""
								: "opacity-0"
						}
						onClick={() => addTranslation(langKey, propKey, inputValue)}
					>
						<span className="icon-[solar--document-add-broken] text-xl"></span>
					</Button>
				}
			/>
		</Tooltip>
	);
};

const GenerativeTypeSelect = ({
	isLoading,
	handleGenerateEmptyTranslations,
}: {
	isLoading: boolean;
	handleGenerateEmptyTranslations: (
		generativeType: GenerativeType
	) => Promise<void>;
}) => {
	const { translate } = useLsmTranslation();

	const GENERATIVE_TYPES: GenerativeType[] = [
		"ONLY_EMPTY_FIELDS",
		"IMPROVE_AND_FILL_TRANSLATIONS",
	];

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button color="primary" variant="light" isIconOnly>
					{isLoading ? (
						<Spinner color="primary" size="sm" />
					) : (
						<span className="icon-[fluent--bot-sparkle-24-regular] text-2xl"></span>
					)}
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="solid">
				{GENERATIVE_TYPES.map((generativeType) => {
					return (
						<DropdownItem
							key={generativeType}
							onClick={async () =>
								await handleGenerateEmptyTranslations(generativeType)
							}
						>
							{translate(`GENERATIVE_TYPES.${generativeType}`)}
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
};

type TranslationColumnProps = {
	langKey: string;
	languageValues: object;
	addTranslation: (langKey: string, key: string, value: string) => void;
	removeLanguage: (key: string) => void;
	fillAllLanguageTranslations: (
		langKey: string,
		generativeType: GenerativeType,
		newTranslations: object
	) => void;
	addTranslationsToALanguage: (
		langKey: string,
		newTranslations: object
	) => void;
};

const TranslationColumn: FC<TranslationColumnProps> = ({
	langKey,
	languageValues,
	addTranslation,
	removeLanguage,
	fillAllLanguageTranslations,
	addTranslationsToALanguage,
}) => {
	const { generateEmptyTranslations, isLoading } = useTranslationsService();

	const handleGenerateEmptyTranslations = async (
		generativeType: GenerativeType
	) => {
		const res = await generateEmptyTranslations(
			langKey,
			generativeType,
			languageValues
		);
		if (!res.isSuccess) {
			return;
		}

		fillAllLanguageTranslations(langKey, generativeType, res.data);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 justify-between">
				<h3 className="text-2xl">{langKey}</h3>
				<Button
					isIconOnly
					color="danger"
					variant="flat"
					onClick={() => removeLanguage(langKey)}
					size="sm"
				>
					<span className="icon-[mono-icons--delete] text-xl"></span>
				</Button>
			</div>
			{Object.keys(languageValues).map((key, index) => {
				const value = languageValues[key as keyof typeof languageValues];
				return (
					<Tooltip content={value}>
						<TranslationValueInput
							key={key + index + langKey + value}
							langKey={langKey}
							defaultValue={value}
							propKey={key}
							addTranslation={addTranslation}
						/>
					</Tooltip>
				);
			})}

			<div className="flex flex-row gap-2 justify-between">
				<GenerativeTypeSelect
					isLoading={isLoading}
					handleGenerateEmptyTranslations={handleGenerateEmptyTranslations}
				/>
				<div className="flex flex-row gap-2">
					<UploadJSONButton
						addTranslationsToALanguage={(newTranslations: object) =>
							addTranslationsToALanguage(langKey, newTranslations)
						}
					/>
					<DownloadAsJSONButton
						data={languageValues}
						fileName={`${langKey}.translations`}
					/>
				</div>
			</div>
		</div>
	);
};

export default TranslationColumn;
