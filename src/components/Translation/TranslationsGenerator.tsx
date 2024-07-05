import KeysColumn from "./KeysColumn";
import TranslationColumn from "./TranslationColumn";
import NewElementPopover from "./NewElementPopover";
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
		addTranslationsToALanguage,
		translationsKeys: keys,
	} = database;

	const { translate } = useLsmTranslation();
	return (
		<section className="grid col-span-3">
			<h1 className="text-3xl font-bold">
				{translate("translationsGenerator")}
			</h1>

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
							addTranslationsToALanguage={addTranslationsToALanguage}
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
