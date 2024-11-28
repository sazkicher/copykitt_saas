"use client";
import Image from "next/image";
import React from "react";
import Form from "./form";
import Results from "./results";

const CopyKitt: React.FC = () => {
	const CHARACTER_LIMIT: number = 50;
	const ENDPOINT: string = process.env.NEXT_PUBLIC_API_ENDPOINT || "";
	const [prompt, setPrompt] = React.useState("");
	const [snippet, setSnippet] = React.useState("");
  const [keyword, setKeyword] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);


	const onSubmit = () => {
		console.log("Submitting: " + prompt);
		setIsLoading(true);
		fetch(`${ENDPOINT}?prompt=${prompt}`).then((res) => res.json()).then(onResult);
	};

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
		displayedElement = <Results snippet={snippet} keyword={keyword} onBack={onReset} prompt={prompt}/>
	} else { 
		displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT} />;
	}
	
	return (
		<>
			<Image
          className="dark:invert  w-auto h-16"
          src="/copykittLogo.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
			<h1 className="text-2xl font-bold">Branding Ideas AI!</h1>
			{displayedElement}
		</>
	);
}
export default CopyKitt;
