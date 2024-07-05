import { Button, ButtonGroup, Code } from "@nextui-org/react";
import { memo, useState } from "react";
import { LsmTranslationOptions, useLsmTranslation } from "react-lsm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeRenderer = memo(({ codeString }: any) => {
	const { setLanguage, language } = useLsmTranslation();
	const [isCopied, setIsCopied] = useState(false);

	const copyCode = () => {
		navigator.clipboard.writeText(codeString).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 1500); // Reset icon after 2 seconds
		});
	};

	return (
		<Code className="flex flex-col gap-1">
			<div className="flex justify-between pt-1">
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
				<Button isIconOnly onClick={copyCode} isDisabled={isCopied}>
					{isCopied ? (
						<span className="icon-[iconamoon--check] text-xl transition-all duration-500"></span>
					) : (
						<span className="icon-[lucide--copy] text-xl transition-all duration-500"></span>
					)}
				</Button>
			</div>
			<SyntaxHighlighter
				language="javascript"
				style={oneDark}
				showLineNumbers
				customStyle={{
					borderRadius: "0.5rem",
					marginBottom: "0.25rem",
				}}
			>
				{codeString}
			</SyntaxHighlighter>
		</Code>
	);
});

const getCodeString = (
	options: LsmTranslationOptions,
	translationKey: string,
	outputText: string
) => {
	const formattedOptions = JSON.stringify(options, null, 12);
	const codeString = `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
		const { translate } = useLsmTranslation();
		return <h1>{translate("${translationKey}", ${formattedOptions})}</h1>;

		// OUTPUT: ${outputText}
	};
	`;
	return codeString;
};
type CodeExampleProps = {
	options: LsmTranslationOptions;
	translationKey: string;
};
const CodeExample = ({ options, translationKey }: CodeExampleProps) => {
	const { translate, setLanguage, language } = useLsmTranslation();
	const code = getCodeString(
		options,
		translationKey,
		translate(translationKey, options)
	);
	return (
		<div className="flex flex-col mt-2">
			<CodeRenderer codeString={code} />
		</div>
	);
};

export default CodeExample;
