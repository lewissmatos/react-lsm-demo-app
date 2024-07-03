import KeysColumn from "./KeysColumn";
import TranslationColumn from "./TranslationColumn";
import NewElementPopover from "./NewElementPopover";
import useLocalDatabase from "../../hooks/useLocalDatabase";
import { useLsmTranslation } from "react-lsm";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

const TranslationsGenerator = () => {
	const {
		translations,
		addTranslation,
		addKey,
		updateKey,
		removeKey,
		addLanguage,
		removeLanguage,
		fillAllLanguageTranslations,
	} = useLocalDatabase();

	const { translate, language, setLanguage } = useLsmTranslation();
	const keys = Object.keys(Object?.values(translations)?.[0] ?? {});
	return (
		<section className="grid col-span-3">
			<header className="flex flex-row gap-2 justify-between">
				<h1 className="text-4xl font-bold">{translate("languages")}</h1>
				<Dropdown>
					<DropdownTrigger>
						<Button variant="solid">
							{translate("appLanguage", {
								replace: { values: { currentLanguage: language } },
							})}
						</Button>
					</DropdownTrigger>
					<DropdownMenu variant="solid">
						<DropdownItem key="en-US" onClick={() => setLanguage("en-US")}>
							<span className={language === "en-US" ? "font-bold" : ""}>
								en-US
							</span>
						</DropdownItem>
						<DropdownItem key="es-MX" onClick={() => setLanguage("es-MX")}>
							<span className={language === "es-MX" ? "font-bold" : ""}>
								es-MX
							</span>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</header>
			<div className="flex flex-row gap-6 mt-6">
				<KeysColumn
					keys={keys}
					addKey={addKey}
					removeKey={removeKey}
					updateKey={updateKey}
				/>
				{Object.keys(translations).map((langKey) => {
					const languageValues =
						translations[langKey as keyof typeof translations];
					return (
						<TranslationColumn
							key={langKey}
							langKey={langKey}
							languageValues={languageValues}
							addTranslation={addTranslation}
							removeLanguage={removeLanguage}
							fillAllLanguageTranslations={fillAllLanguageTranslations}
						/>
					);
				})}
				<NewElementPopover
					isDisabled={() => Object.keys(translations).length >= 5}
					placeholder="Enter a new Language"
					label="Add Language"
					action={(key) => addLanguage(key)}
				/>
			</div>
		</section>
	);
};

export default TranslationsGenerator;
