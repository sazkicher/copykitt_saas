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
		if (text.length <= props.characterLimit){
			props.setPrompt(text);
		}
	}


	return (
		<>
			<p>
				Tell me what your brand is about and I will generate copy and keywords
				for you.
			</p>
			<input className="border border-black px-0 py-0 rounded focus:outline focus:outline-2 focus:outline-blue-500" type="text" placeholder="coffee" value={props.prompt} onChange={(e) => updatePromptValue(e.currentTarget.value)} />
			<div>{props.prompt.length}/{props.characterLimit} </div>
			<button className="border border-black px-1 py-0 rounded focus:outline focus:outline-2 focus:outline-blue-500" onClick={props.onSubmit} disabled={props.isLoading || !isPromptValid}> Submit </button>
		</>
	);
};

export default Form;