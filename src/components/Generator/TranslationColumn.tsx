import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Tooltip,
} from "@nextui-org/react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import DownloadAsJSONButton from "./DownloadAsJSONButton";
import { initLsm, useLsmTranslation } from "react-lsm";
import useTranslationsService, {
	GenerativeType,
} from "../../services/useTranslationsService";
import useLocalDatabase from "../../hooks/useLocalDatabase";

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
	const debounceTimeoutRef = useRef<any>(null);

	useEffect(() => {
		setInputValue(defaultValue);
	}, [defaultValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}
		debounceTimeoutRef.current = setTimeout(() => {
			addTranslation(langKey, propKey, e.target.value);
		}, 750);
	};
	return (
		<Input
			value={inputValue}
			onChange={handleChange}
			placeholder={`${langKey} Value`}
		/>
	);
};

const GenerativeTypeSelect = ({
	setGenerativeType,
}: {
	setGenerativeType: React.Dispatch<React.SetStateAction<GenerativeType>>;
}) => {
	const { translate } = useLsmTranslation();

	const GENERATIVE_TYPES: GenerativeType[] = [
		"ONLY_EMPTY_FIELDS",
		"IMPROVE_AND_FILL_TRANSLATIONS",
	];

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="light" isIconOnly>
					<span className="icon-[iconamoon--arrow-down-2] text-xl"></span>
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="solid">
				{GENERATIVE_TYPES.map((generativeType) => {
					return (
						<DropdownItem
							key={generativeType}
							onClick={() => setGenerativeType(generativeType)}
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
};

const TranslationColumn: FC<TranslationColumnProps> = ({
	langKey,
	languageValues,
	addTranslation,
	removeLanguage,
	fillAllLanguageTranslations,
}) => {
	const { generateEmptyTranslations, isLoading } = useTranslationsService();

	const { translate } = useLsmTranslation();
	const { translations } = useLocalDatabase();
	const [generativeType, setGenerativeType] =
		useState<GenerativeType>("ONLY_EMPTY_FIELDS");

	const handleGenerateEmptyTranslations = async () => {
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

	const userGeneratedFallbackLanguage = Object.keys(translations)?.[0];
	const UserGeneratedConfiguredProvider = initLsm(
		userGeneratedFallbackLanguage,
		translations
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 justify-between">
				<h3 className="text-2xl">{langKey}</h3>
				<Button
					isIconOnly
					color="danger"
					variant="light"
					onClick={() => removeLanguage(langKey)}
					size="sm"
				>
					<span className="icon-[mono-icons--delete] text-xl"></span>
				</Button>
			</div>
			<UserGeneratedConfiguredProvider>
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
			</UserGeneratedConfiguredProvider>

			<div className="flex flex-row gap-2">
				<Button
					color="primary"
					onClick={async () => {
						await handleGenerateEmptyTranslations();
					}}
					isDisabled={isLoading}
					className="pr-0"
					endContent={
						<GenerativeTypeSelect setGenerativeType={setGenerativeType} />
					}
				>
					{translate(`GENERATIVE_TYPES.${generativeType}`, {
						mutate: {
							when: isLoading,
							value: "generatingTranslations",
							withTranslation: true,
						},
					})}

					<span className="icon-[fluent--bot-sparkle-24-regular] text-xl"></span>
				</Button>

				<DownloadAsJSONButton
					data={languageValues}
					fileName={`${langKey}.translations`}
				/>
			</div>
		</div>
	);
};

export default TranslationColumn;
