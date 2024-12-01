interface FormProps {
	prompt: string,
	setPrompt: any;
	onSubmit: any;
	isLoading: boolean;
	characterLimit: number;
}


const Form: React.FC<FormProps> = (props) => {
	const isPromptValid = props.prompt.length < props.characterLimit;
	const updatePromptValue = (text: string) => {
		if (text.length <= props.characterLimit) {
			props.setPrompt(text);
		}
	}

	let statusColor: string = "text-slate-500";
	let statusText: string = "";
	if (!isPromptValid) {
		statusColor = " text-red-400";
		statusText = `Input must be less than ${props.characterLimit} characters.`;
	}

	return (
		<>
			<div className="mb-4 dark:text-slate-300 text-slate-700">
				<p>
					Tell me what your brand is about and I will generate copy and keywords
					for you.
				</p>
			</div>
			<input className="p-2 w-full  rounded-md focus:outline focus:outline-2 dark:focus:outline-orange-800 focus:outline-teal-500  text-slate-700" type="text" placeholder="coffee" value={props.prompt} onChange={(e) => updatePromptValue(e.currentTarget.value)} />
			<div className={"flex justify-between my-1 text-sm " + statusColor}>
				<div>{statusText}</div>
				<div>{props.prompt.length}/{props.characterLimit}</div>
			</div>
			<button className="mt-6 p-2 w-full rounded-md  bg-gradient-to-r from-teal-400 to-blue-500 dark:from-red-500 dark:to-yellow-600 disabled:opacity-70 text-lg hover:opacity-90"
				onClick={props.onSubmit} disabled={props.isLoading || !isPromptValid || props.prompt == '' }> Submit
			</button>

		</>
	);
};

export default Form;