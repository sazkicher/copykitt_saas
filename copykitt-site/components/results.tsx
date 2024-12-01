interface ResultsProps {
	prompt: string;
	snippet: string;
	keyword: string[];
	onBack:() => void;
}


const Results: React.FC<ResultsProps> = (props) => {
	const keywordElements = [];
	const keywordLen = props.keyword && props.keyword.length > 0 ? props.keyword.length : 1;
	
	for (let i = 0; i < keywordLen; i++){
		const element = <div key={i} className="text-sm rounded-md px-1 dark:text-red-700 dark:bg-orange-200 text-teal-700 bg-teal-200">#{props.keyword[i]}</div>
		keywordElements.push(element);
	}

const keywordElementsHolder = <div className="flex flex-wrap gap-2"> {keywordElements}</div>

const resultSection = (label: string, body:any) => {
	return(
	<div className=" dark:bg-slate-700 bg-slate-300 p-4 my-3 rounded-md">
		<div className="dark:text-slate-400 text-slate-500 text-sm font-bold mb-2">{label}</div>
		<div className="dark:text-white text-slate-800">{body}</div>
	</div>
	)
}
	return (
		<>
			<div className="">
				{resultSection("Prompt", <div className="text-lg">{props.prompt}</div>)}
				{resultSection("Branding Snippet", <div className="">{props.snippet}</div>)}
				{resultSection("Keywords", <div className="">{keywordElementsHolder}</div>)}
			</div>
			<button className="mt-8 p-2 w-full rounded-md  bg-gradient-to-r from-teal-400 to-blue-500 dark:from-red-500 dark:to-yellow-600 disabled:opacity-70 text-lg hover:opacity-90"
			onClick={props.onBack}>Back
			</button>
		</>
	);
};

export default Results;