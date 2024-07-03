import "./App.scss";
import { initLsm } from "react-lsm";
import TranslationsGenerator from "./components/Generator/TranslationsGenerator";
import en_US from "./locales/en-US.translation.json";
import es_MX from "./locales/es-MX.translation.json";

function App() {
	const userGeneratedFallbackLanguage = "en-US";
	const GeneratorConfiguredProvider = initLsm(userGeneratedFallbackLanguage, {
		"en-US": en_US,
		"es-MX": es_MX,
	});

	return (
		<main className="flex flex-col gap-4">
			<GeneratorConfiguredProvider>
				<TranslationsGenerator />
			</GeneratorConfiguredProvider>
			{/* <UsageConfiguredProvider> */}
			<section className="grid col-span-1">
				<h1 className="text-4xl font-bold">Example</h1>
			</section>
			{/* </UsageConfiguredProvider> */}
		</main>
	);
}

export default App;
