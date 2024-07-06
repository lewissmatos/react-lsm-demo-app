import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Spinner,
	Textarea,
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
	const isObject = typeof defaultValue === "object";

	defaultValue = !isObject
		? defaultValue
		: JSON.stringify(defaultValue, null, 4);

	const [inputValue, setInputValue] = useState(defaultValue);

	useEffect(() => {
		setInputValue(defaultValue);
	}, [defaultValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const inputProps = {
		value: inputValue,
		onChange: handleChange,
		placeholder: `${langKey} Value`,
		endContent: (
			<>
				{isObject ? (
					<Popover className="w-[600px]">
						<PopoverTrigger>
							<Button variant="light" color="primary" isIconOnly size="sm">
								<span className="icon-[solar--document-add-broken] text-xl"></span>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="flex flex-col gap-1 items-end">
							<Textarea
								onChange={handleChange}
								value={inputValue}
								placeholder={`${langKey} Value`}
							/>
							<Button
								variant="light"
								isIconOnly
								size="sm"
								onClick={() => {
									addTranslation(
										langKey,
										propKey,
										!isObject ? inputValue : JSON.parse(inputValue)
									);
								}}
							>
								<span className="icon-[material-symbols--bookmark-added-outline-rounded] text-xl"></span>
							</Button>
						</PopoverContent>
					</Popover>
				) : (
					<Button
						variant="light"
						color="primary"
						isIconOnly
						size="sm"
						className={
							inputValue.length > 0 && inputValue !== defaultValue
								? ""
								: "opacity-0 pointer-events-none"
						}
						onClick={() => addTranslation(langKey, propKey, inputValue)}
					>
						<span className="icon-[material-symbols--bookmark-added-outline-rounded] text-xl"></span>
					</Button>
				)}
			</>
		),
	};
	return (
		<Tooltip content={inputValue}>
			<Input {...inputProps} />
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
	index: number;
};

const TranslationColumn: FC<TranslationColumnProps> = ({
	langKey,
	languageValues,
	addTranslation,
	removeLanguage,
	fillAllLanguageTranslations,
	addTranslationsToALanguage,
	index,
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
				<h3 className="text-2xl">
					{langKey}{" "}
					{index === 0 ? <span className="text-xs">(fbkLang)</span> : null}
				</h3>
				{index !== 0 ? (
					<Button
						isIconOnly
						color="danger"
						variant="flat"
						onClick={() => removeLanguage(langKey)}
						size="sm"
					>
						<span className="icon-[mono-icons--delete] text-xl"></span>
					</Button>
				) : null}
			</div>
			{Object.keys(languageValues).map((key, index) => {
				const value = languageValues[key as keyof typeof languageValues];
				return (
					<Tooltip content={value} key={key + index + langKey + value}>
						<TranslationValueInput
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
