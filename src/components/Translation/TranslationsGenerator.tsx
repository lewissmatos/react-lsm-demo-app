import KeysColumn from "./KeysColumn";
import TranslationColumn from "./TranslationColumn";
import NewElementPopover from "./NewElementPopover";
import { useLsmTranslation } from "react-lsm";
import LanguageSelector from "../UI/LanguageSelector";
import { FC } from "react";
import { Button, Link, Tooltip } from "@nextui-org/react";

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
			<header className="flex flex-row gap-2 justify-between">
				<h1 className="text-4xl font-bold">
					{translate("translationsGenerator")}
				</h1>
				<div className="flex flex-row gap-2">
					<Tooltip content={translate("npmRepository")}>
						<Link
							href="https://www.npmjs.com/package/react-lsm?activeTab=readme"
							target="_blank"
						>
							<Button color="primary" variant="flat" isIconOnly>
								<span className="icon-[iconoir--npm] text-xl  text-white"></span>
							</Button>
						</Link>
					</Tooltip>
					<Tooltip content={translate("githubRepository")}>
						<Link
							href="https://github.com/lewissmatos/react-lsm#readme"
							target="_blank"
						>
							<Button color="primary" variant="flat" isIconOnly>
								<span className="icon-[iconoir--github] text-xl text-white"></span>
							</Button>
						</Link>
					</Tooltip>
					<Tooltip content={translate("microsoftLanguagesReference")}>
						<Link
							href="https://learn.microsoft.com/es-es/partner-center/developer/partner-center-supported-languages-and-locales"
							target="_blank"
						>
							<Button color="primary" variant="flat" isIconOnly>
								<span className="icon-[logos--microsoft-icon] text-md"></span>
							</Button>
						</Link>
					</Tooltip>
					<LanguageSelector />
				</div>
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
