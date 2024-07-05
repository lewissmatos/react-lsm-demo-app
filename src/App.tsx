import "./App.scss";
import { initLsm } from "react-lsm";
import TranslationsGenerator from "./components/Translation/TranslationsGenerator";
import en_US from "./locales/en-US.translation.json";
import es_MX from "./locales/es-MX.translation.json";
import OptionGenerator from "./components/Options/OptionsGenerator";
import useLocalDatabase from "./hooks/useLocalDatabase";
import AppHeader from "./components/UI/AppHeader";

function App() {
	const database = useLocalDatabase();
	const userGeneratedFallbackLanguage = "en-US";
	const GeneratorConfiguredProvider = initLsm(userGeneratedFallbackLanguage, {
		"en-US": en_US,
		"es-MX": es_MX,
	});

	return (
		<GeneratorConfiguredProvider>
			<main className="flex flex-col gap-6">
				<AppHeader />
				<TranslationsGenerator database={database} />
				<OptionGenerator translations={database.translations} />
				{/* <Documentation /> */}
			</main>
		</GeneratorConfiguredProvider>
	);
}

export default App;
