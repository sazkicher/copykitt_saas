"use client";
import Image from "next/image";
import logo from "../public//copykittLogo.svg"
import React from "react";
import Form from "./form";
import Results from "./results";

const CopyKitt: React.FC = () => {
	const CHARACTER_LIMIT: number = 50;
	// const ENDPOINT: string = process.env._API_ENDPOINT || "";
	const [prompt, setPrompt] = React.useState("");
	const [snippet, setSnippet] = React.useState("");
	const [keyword, setKeyword] = React.useState([]);
	const [hasResult, setHasResult] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);


	const onSubmit = async () => {
		console.log("Submitting: " + prompt);
		setIsLoading(true);
		try {
			const response = await fetch(`/api/proxy?prompt=${encodeURIComponent(prompt)}`, {
				method: 'GET', // Cambiado a GET
			});

			if (!response.ok) {
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();
			onResult(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
		// fetch(`${ENDPOINT}?prompt=${prompt}`).then((res) => res.json()).then(onResult).catch(error => {
		//    console.error('Error fetching data:', error);
		//  });;
	};

	// console.log(ENDPOINT);

	const onResult = (data: any) => {
		setSnippet(data.snippet);
		setKeyword(data.keyword);
		setHasResult(true);
		setIsLoading(false);
	};
	const onReset = () => {
		setPrompt("")
		setHasResult(false);
		setIsLoading(false);
	};

	let displayedElement = null;

	console.log(snippet)
	console.log(keyword)

	if (hasResult) {
		displayedElement = <Results snippet={snippet} keyword={keyword} onBack={onReset} prompt={prompt} />
	} else {
		displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT} />;
	}
	const gradientTextStyle =
    	"text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 dark:from-red-500 dark:to-yellow-600 font-light w-fit mx-auto";
	return (
		<div className="h-screen flex">

			<div className="max-w-md m-auto p-2">
				<div className=" bg-gray-200 dark:bg-gray-800 p-6 rounded-md "> 
					<div className="text-center my-6">
						<Image
							className="dark:invert mx-auto"
							src={logo}
							alt="Next.js logo"
							width={64}
							height={64}
							priority
						/>
						<h1 className={gradientTextStyle +" text-3xl font-light"}>Branding Ideas AI</h1>
						<div> Your AI branding asistant</div>
					</div>
					{displayedElement}
				</div>


				<footer className="row-start-3 flex gap-2 flex-wrap ">
					project by
					<a
						className="flex items-center gap-1 hover:underline hover:underline-offset-4"
						href="https://github.com/sazkicher"
						target="_blank"
						rel="noopener noreferrer"
					>

						<Image
							aria-hidden
							src="/github-white.svg"
							alt="github icon"
							width={16}
							height={16}
						/>
						sazkicher
					</a>
				</footer>
			</div>

		</div>
	);
}
export default CopyKitt;
