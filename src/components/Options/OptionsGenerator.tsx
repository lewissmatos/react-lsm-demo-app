import { useLsmTranslation, initLsm } from "react-lsm";
import CodeExample from "./CodeExample";
import { FC, useState } from "react";
import { Divider, Input } from "@nextui-org/react";
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
			<h1 className="text-4xl font-bold">{translate("options")}</h1>
			<div className="grid grid-cols-5 gap-4 mt-4">
				<div className="col-span-2">
					<Input
						onChange={(e) => setTranslationKey(e.target.value)}
						label={translate("translationKey")}
						className="mt-2"
						value={translationKey}
					/>
					<Divider className="my-4" />

					<div className="mt-2">
						<p className="text font-semibold text-xl">
							{translate("textFormat")}
						</p>
						<TextCaseSection options={options} setOptions={setOptions} />

						<Divider className="my-4" />
						<div>
							<p className="text font-semibold text-xl">
								{translate("textMutation")}
							</p>
							<ReplaceSection options={options} setOptions={setOptions} />
							<Divider className="my-4" />
							<MutateSection options={options} setOptions={setOptions} />
						</div>
						<Divider className="my-4" />
						<div>
							<p className="text font-semibold text-xl">
								{translate("adornments")}
							</p>
							<AdornmentsSection
								options={options}
								setOptions={setOptions}
								property="startAdornment"
							/>
							<AdornmentsSection
								options={options}
								setOptions={setOptions}
								property="endAdornment"
							/>
						</div>
					</div>
				</div>

				<div className="col-span-3">
					<UserGeneratedConfiguredProvider>
						<CodeExample options={options} translationKey={translationKey} />
					</UserGeneratedConfiguredProvider>
				</div>
			</div>
		</section>
	);
};

export default OptionGenerator;
