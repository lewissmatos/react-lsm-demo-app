import { useLsmTranslation, initLsm } from "react-lsm";
import CodeExample from "./CodeExample";
import { FC } from "react";
import { Divider, Input, Switch } from "@nextui-org/react";
import ReplaceSection from "./ReplaceSection";
import MutateSection from "./MutateSection";
import AdornmentsSection from "./AdornmentSection";
import useLocalDatabase from "../../hooks/useLocalDatabase";
import TextCaseSection from "./TextCaseSection";

type OptionGeneratorProps = {
	translations: any;
};

const OptionGenerator: FC<OptionGeneratorProps> = ({ translations }) => {
	const { translate } = useLsmTranslation();
	const { options, setOptions, translationKey, setTranslationKey } =
		useLocalDatabase();
	const userGeneratedFallbackLanguage = Object.keys(translations)?.[0];
	const UserGeneratedConfiguredProvider = initLsm(
		userGeneratedFallbackLanguage,
		translations
	);

	return (
		<section className="grid col-span-3">
			<h2 className="text-3xl font-bold">{translate("optionsScreen.title")}</h2>
			<div className="grid grid-cols-5 gap-4 mt-4">
				<div className="col-span-5 lg:col-span-2">
					<div className="flex flex-col items-start gap-2 justify-between">
						<Input
							onChange={(e) => setTranslationKey(e.target.value)}
							label={translate("optionsScreen.translationKey")}
							className="mt-2"
							value={translationKey}
						/>
						<Switch
							size="sm"
							defaultSelected={options?.rejectDefaultFallback}
							key={options?.rejectDefaultFallback ? "reject" : "no-reject"}
							onChange={(e) => {
								setOptions({
									...options,
									rejectDefaultFallback: e.target.checked,
								});
							}}
						>
							{translate("optionsScreen.rejectDefaultFallback")}
						</Switch>
					</div>

					<Divider className="my-4" />
					<div className="mt-2">
						<p className="text font-semibold text-xl">
							{translate("optionsScreen.textFormat")}
						</p>
						<TextCaseSection options={options} setOptions={setOptions} />

						<Divider className="my-4" />
						<div>
							<p className="text font-semibold text-xl">
								{translate("optionsScreen.textMutation")}
							</p>
							<ReplaceSection options={options} setOptions={setOptions} />
							<MutateSection options={options} setOptions={setOptions} />
						</div>
						<Divider className="my-4" />
						<div>
							<p className="text font-semibold text-xl">
								{translate("optionsScreen.adornments")}
							</p>
							<AdornmentsSection
								options={options}
								setOptions={setOptions}
								property="prefixContent"
							/>
							<AdornmentsSection
								options={options}
								setOptions={setOptions}
								property="suffixContent"
							/>
						</div>
					</div>
				</div>

				<div className="col-span-5 lg:col-span-3">
					{/* <UserGeneratedConfiguredProvider> */}
					<CodeExample
						options={options}
						translationKey={translationKey}
						TranslationsProvider={
							UserGeneratedConfiguredProvider as FC<{
								children: React.ReactNode;
							}>
						}
					/>
					{/* </UserGeneratedConfiguredProvider> */}
				</div>
			</div>
		</section>
	);
};

export default OptionGenerator;
