import { memo,  } from "react";
import { useLsmTranslation } from "react-lsm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import documentationExamples from "./documentation-examples";
const CodeRenderer = memo(({ codeString }: any) => {
	return (
		<SyntaxHighlighter
			language="jsx"
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
	);
});

const Documentation = () => {
	const { translate } = useLsmTranslation();
	
	return (
		<section className="grid col-span-3">

			<h2 className="text-3xl font-bold">{translate("documentation")}</h2>
			<div className="grid grid-cols-1 gap-4">
				{documentationExamples.map((example: any) => (
					<div key={example.title}>
						<div className="flex flex-row items-end gap-2">
							<h3 className="text-3xl font-semibold text-primary">
								{example.title}
							</h3>
							<h4 className="text-xl text-primary-500 block">
								({example.subtitle})
							</h4>
						</div>
						<p className="text-xl text-gray-600">{example.description}</p>
						<CodeRenderer codeString={example.code} />
					</div>
				))}
			</div>
		</section>
	);
};
export default Documentation;
