type DocumentationExample = {
	title: string;
	subtitle: string;
	description: string;
	code: string;
	outputs?: string[];
};

const documentationExamples: DocumentationExample[] = [
	{
		title: "Provider",
		subtitle: "Basic usage",
		description: "LsmConfiguredProvider",
		code: `
const App = () => {
    return (
        <LsmConfiguredProvider>
            <Example />
        </LsmConfiguredProvider>;
    );
};
`,
	},
	{
		title: "Example",
		subtitle: "Component usage",
		description: "Using useLsmTranslation hook",
		code: `
import { useLsmTranslation } from "react-lsm";
const Example = () => {
    const { translate, language, setLanguage } = useLsmTranslation();
    return (
        <div>
            <h1>{translate("greeting")}</h1>
            <button onClick={() => setLanguage("es-MX")}>Español</button> {/* This will change the language */}
            <button onClick={() => setLanguage("en-US")}>English</button> {/* This will change the language */}
            <p>{language}</p> {/* This will show the current language */}
            <h1>{translate("farewell")}</h1>
        </div>
    );
    // Output: Hello
    // Output: Hola
};
`,
	},
	{
		title: "Example (Wrong Approach)",
		subtitle: "Incorrect use with useEffect",
		description: "Incorrect usage of useLsmTranslation with useEffect",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    const fetchUserData = async () => {
        const response = await
                fetch("https://api.example.com/user")
                .then((data) => setUserData(data));  <- This is the important part
        const data = await response.json();
        return data;
    };

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <h1>{translate("userProfile")}</h1>
            {/* Wrong Approach - Output: User Profile */ }
            <p>{userData.name}</p>
            <p>{userData.email}</p>
        </div>
    );
};
`,
	},
	{
		title: "Example (Correct Approach)",
		subtitle: "Correct use with useEffect",
		description: "Correct usage of useLsmTranslation with useEffect",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

// This is the correct approach
const UserProfileData = React.memo(({userData}: {userData: any}) => {
    return (
        <div>
            <p>{userData.name}</p>
            <p>{userData.email}</p>
        </div>
    );
});

const Example = () => {
    const { translate } = useLsmTranslation();

    const fetchUserData = async () => {
        const response = await
                        fetch("https://api.example.com/user")
                        .then((data) => setUserData(data));  <- This is the important part

        const data = await response.json()
        return data;
    };

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData()
    }, []);

    return (
        <div>
            <h1>{translate("userProfile")}</h1>
            {/* Correct Approach - Output: User Profile */ }
            <UserProfileData userData={userData} />
        </div>
    );
};
`,
	},
	{
		title: "Basic Usage",
		subtitle: "Simple translation",
		description: "Basic usage of useLsmTranslation hook",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return <h1>{translate("greeting")}</h1>;
    // Output: Hello
    // Output: Hola
};
`,
	},
	{
		title: "Options Usage",
		subtitle: "Translation options",
		description: "Using different options for translation",
		code: `
type TranslationOptions = {
    capitalize?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
    replace?: {
        values: { [key: string]: string | number };
        withTranslation?: boolean;
    };
    mutate?: {
        when: boolean;
        value: string;
        withTranslation?: boolean;
    };
    prefixContent?: string;
    suffixContent?: string;
};
`,
	},
	{
		title: "Capitalize",
		subtitle: "Deprecated option",
		description: "Capitalize the first letter of the value",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return <h1>{translate("info", { capitalize: true })}</h1>;
    // Output: Information
    // Output: Información
};
`,
	},
	{
		title: "Uppercase",
		subtitle: "Deprecated option",
		description: "Convert the value to uppercase",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return <h1>{translate("greeting", { uppercase: true })}</h1>;
    // Output: HELLO
    // Output: HOLA
};
`,
	},
	{
		title: "Lowercase",
		subtitle: "Deprecated option",
		description: "Convert the value to lowercase",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return <h1>{translate("greeting", { lowercase: true })}</h1>;
    // Output: hello
    // Output: hola
};
`,
	},
	{
		title: "TextCase",
		subtitle: "Newest option",
		description: "Specify text case for translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("greeting", {
                textCase: "capitalize" | "uppercase" | "lowercase",
            })}
        </h1>
    );
};
`,
	},
	{
		title: "Replace",
		subtitle: "Replace values",
		description: "Replace specific values in the translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("activeNotifications", {
                replace: { values: { value: 5 } },
            })}
        </h1>
    );
    // Output: You have 5 notifications
    // Output: Tienes 5 notificaciones
};
`,
	},
	{
		title: "Replace, Without Translation",
		subtitle: "Manual replace",
		description: "Replace values without additional translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {
                translate("orderStatus", {
                    replace: {
                        values: {
                            status: "pending",
                        },
                    },
                }),
            }
        </h1>
    );
    // Output: Your order is pending
    // Output: Su orden está pending  (This is undesirable)
};
`,
	},
	{
		title: "Replace, With Translation",
		subtitle: "Recommended replace",
		description: "Replace values with additional translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("orderStatus", {
                replace: {
                    values: { status: "orderStatuses.shipped" },
                    withTranslation: true,
                },
            })}
        </h1>
    );
    // Output: Your order is shipped
    // Output: Su orden está enviada
};
`,
	},
	{
		title: "Replace, Explicit translation",
		subtitle: "Manual replace with explicit translation",
		description: "Manually replace values with explicit translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("orderStatus", {
                replace: { values: { status: translate("shipped") } },
            })}
        </h1>
    );
    // Output: Your order is shipped
    // Output: Su orden está enviada
};
`,
	},
	{
		title: "Mutate: Basic",
		subtitle: "Basic mutate",
		description: "Basic mutation of translation values",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example

 = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("text", {
                mutate: {
                    when: true,
                    value: "This is a mutation",
                },
            })}
        </h1>
    );
    // Output: This is a mutation
};
`,
	},
	{
		title: "Mutate: With Translation",
		subtitle: "Mutate with translation",
		description: "Mutate translation values with translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("text", {
                mutate: {
                    when: true,
                    value: "translationKey",
                    withTranslation: true,
                },
            })}
        </h1>
    );
    // Output: Translated text from "translationKey"
};
`,
	},
	{
		title: "Prefix Content",
		subtitle: "Prefix content",
		description: "Add a prefix to the translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("greeting", {
                prefixContent: "Welcome: ",
            })}
        </h1>
    );
    // Output: Welcome: Hello
    // Output: Bienvenido: Hola
};
`,
	},
	{
		title: "Suffix Content",
		subtitle: "Suffix content",
		description: "Add a suffix to the translation",
		code: `
import React from "react";
import { useLsmTranslation } from "react-lsm";

const Example = () => {
    const { translate } = useLsmTranslation();
    return (
        <h1>
            {translate("greeting", {
                suffixContent: "!",
            })}
        </h1>
    );
    // Output: Hello!
    // Output: ¡Hola!
};
`,
	},
];

export default documentationExamples;
