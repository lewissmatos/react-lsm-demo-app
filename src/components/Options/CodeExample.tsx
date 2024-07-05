import { Button, ButtonGroup, Code, Tooltip } from "@nextui-org/react";
import { FC, memo, useState } from "react";
import { LsmTranslationOptions, useLsmTranslation } from "react-lsm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyButton = ({ tooltipContent, content, iconClass }: any) => {
	const [isCopied, setIsCopied] = useState(false);

	const onCopy = () => {
		navigator.clipboard.writeText(content).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 1500); // Reset icon after 2 seconds
		});
	};
	return (
		<Tooltip content={tooltipContent}>
			<Button isIconOnly onClick={onCopy} isDisabled={isCopied}>
				{isCopied ? (
					<span className="icon-[iconamoon--check] text-xl transition-all duration-500" />
				) : (
					<span
						className={`${iconClass} text-xl transition-all duration-500`}
					/>
				)}
			</Button>
		</Tooltip>
	);
};

type CodeRendererProps = {
	codeString: string;
	translationKey: string;
	options: LsmTranslationOptions;
	Output: any;
};
const CodeRenderer: FC<CodeRendererProps> = memo(
	({ codeString, translationKey, options, Output }) => {
		const { translate } = useLsmTranslation();

		return (
			<Code className="flex flex-col gap-1 opacity-90 rounded-lg">
				<div className="flex justify-between pt-1">
					{Output}

					<div className="flex gap-2">
						<CopyButton
							tooltipContent={translate("optionsScreen.copyFullCode")}
							content={codeString}
							iconClass="icon-[tabler--code]"
						/>
						<CopyButton
							tooltipContent={translate("optionsScreen.copyOptions")}
							content={`{translate("${translationKey}", ${JSON.stringify(
								options,
								null,
								8
							)})}`}
							iconClass="icon-[hugeicons--code]"
						/>
					</div>
				</div>
				<SyntaxHighlighter
					language="javascript"
					style={oneDark}
					showLineNumbers
					customStyle={{
						borderRadius: "0.5rem",
						marginBottom: "0.25rem",
						fontSize: "1rem",
					}}
				>
					{codeString}
				</SyntaxHighlighter>
			</Code>
		);
	}
);

const getCodeString = (
	options: LsmTranslationOptions,
	translationKey: string
	// outputText: string
) => {
	const formattedOptions = JSON.stringify(options, null, 12);
	const codeString = `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
		const { translate } = useLsmTranslation();
		return <h1>{translate("${translationKey}", ${formattedOptions})}</h1>;
};
`;
	return codeString;
};

const OutputManager = ({
	translationKey,
	options,
}: {
	translationKey: string;
	options: LsmTranslationOptions;
}) => {
	const { setLanguage, language, translate } = useLsmTranslation();

	return (
		<>
			<ButtonGroup>
				<Button
					onClick={() => setLanguage("en-US")}
					className={`text ${
						language === "en-US" ? "font-bold underline" : "text-gray-400"
					}`}
				>
					English
				</Button>
				<Button
					onClick={() => setLanguage("es-MX")}
					className={`text ${
						language === "es-MX" ? "font-bold underline" : "text-gray-400"
					}`}
				>
					Español
				</Button>
			</ButtonGroup>

			<div className="flex flex-row gap-1 my-2 border-b border-gray-200 ">
				<h4 className="text-lg text-gray-500">{">>"}:</h4>
				<h1 className="text-xl font-semibold">
					'{translate(translationKey, options)}'
				</h1>
			</div>
		</>
	);
};

type CodeExampleProps = {
	options: LsmTranslationOptions;
	translationKey: string;
	TranslationsProvider: any;
};

const CodeExample = ({
	options,
	translationKey,
	TranslationsProvider,
}: CodeExampleProps) => {
	const code = getCodeString(options, translationKey);
	return (
		<div className="flex flex-col mt-2">
			<CodeRenderer
				codeString={code}
				translationKey={translationKey}
				options={options}
				Output={
					<TranslationsProvider>
						<OutputManager translationKey={translationKey} options={options} />
					</TranslationsProvider>
				}
			/>
		</div>
	);
};

export default CodeExample;
