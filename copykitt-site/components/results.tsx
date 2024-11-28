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
		const element = <div key={i}>#{props.keyword[i]}</div>
		keywordElements.push(element);
	}

	return (
		<>
			<div>
				<div><b>Prompt</b></div>
				<div>{props.prompt}</div>
				<div><b>Snippet</b></div>
				<div>{props.snippet}</div>
				<div><b>Keywords</b></div>
				<div>{keywordElements}</div>
			</div>
			<button className="border border-black px-1 py-0 rounded focus:outline focus:outline-2 focus:outline-blue-500" onClick={props.onBack}>Back</button>
		</>
	);
};

export default Results;