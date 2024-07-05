import KeysColumn from "./KeysColumn";
import TranslationColumn from "./TranslationColumn";
import NewElementPopover from "./NewElementPopover";
import useLocalDatabase from "../../hooks/useLocalDatabase";
import { useLsmTranslation } from "react-lsm";
import LanguageSelector from "../UI/LanguageSelector";
import { FC } from "react";

type TranslationsGeneratorProps = {
	database: any;
};
const TranslationsGenerator: FC<TranslationsGeneratorProps> = ({
	database,
}) => {
	const {
		translations,
		addTranslation,
		addKey,
		updateKey,
		removeKey,
		addLanguage,
		removeLanguage,
		fillAllLanguageTranslations,
	} = database;

	const { translate } = useLsmTranslation();
	const keys = Object.keys(Object?.values(translations)?.[0] ?? {});
	return (
		<section className="grid col-span-3">
			<header className="flex flex-row gap-2 justify-between">
				<h1 className="text-4xl font-bold">
					{translate("translationsGenerator")}
				</h1>
				<LanguageSelector />
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
					placeholder={translate("enterNewLanguage")}
					label={translate("addLanguage")}
					action={(key) => addLanguage(key)}
				/>
			</div>
		</section>
	);
};

export default TranslationsGenerator;
