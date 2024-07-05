import axios from "axios";
import { memo, useLayoutEffect, useState } from "react";
import { useLsmTranslation } from "react-lsm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const customStyle = {
	lineHeight: "1.5",
	fontSize: "1rem",
	borderRadius: "5px",
	padding: "20px",
};

const CustomPre = (props: any) => <pre id="customPreTag" {...props} />;

const CodeRenderer = memo(({ codeString }: any) => {
	return (
		<SyntaxHighlighter
			PreTag={CustomPre}
			language="markdown"
			style={oneDark}
			showLineNumbers
			customStyle={customStyle}
		>
			{codeString}
		</SyntaxHighlighter>
	);
});

const Documentation = () => {
	const [readme, setReadme] = useState("");
	const { translate } = useLsmTranslation();

	const getReadme = async () => {
		try {
			const response = await axios.get(
				"https://api.github.com/repos/lewissmatos/react-lsm/contents/README.md"
			);
			const content = atob(response.data.content);
			setReadme(content);
		} catch (error) {
			throw error;
		}
	};

	useLayoutEffect(() => {
		getReadme();
	}, []);

	return (
		<section className="grid col-span-1">
			<h1 className="text-4xl font-bold mb-4">{translate("documentation")}</h1>
			{<CodeRenderer codeString={readme} language="markdown" />}
		</section>
	);
};
export default Documentation;
