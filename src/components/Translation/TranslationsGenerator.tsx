import KeysColumn from "./KeysColumn";
import TranslationColumn from "./TranslationColumn";
import { useLsmTranslation } from "react-lsm";
import { FC } from "react";
import AddLanguagePopover from "./AddLanguagePopover";

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
		addNestedKey,
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
			<h2 className="text-3xl font-bold">
				{translate("translationsGenerator")}
			</h2>

			<div className="flex flex-row gap-6 mt-6">
				<KeysColumn
					keys={keys}
					addKey={addKey}
					addNestedKey={addNestedKey}
					removeKey={removeKey}
					updateKey={updateKey}
				/>
				{Object.keys(translations).map((langKey, index) => {
					const languageValues =
						translations[langKey as keyof typeof translations];
					return (
						<TranslationColumn
							key={langKey}
							index={index}
							langKey={langKey}
							languageValues={languageValues}
							addTranslation={addTranslation}
							removeLanguage={removeLanguage}
							fillAllLanguageTranslations={fillAllLanguageTranslations}
							addTranslationsToALanguage={addTranslationsToALanguage}
						/>
					);
				})}
				<AddLanguagePopover
					addLanguage={addLanguage}
					isDisabled={Object.keys(translations).length >= 5}
				/>
			</div>
		</section>
	);
};

export default TranslationsGenerator;
