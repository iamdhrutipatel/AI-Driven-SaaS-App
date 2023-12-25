interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  charLimit: number;
  detail: string;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length <= props.charLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.charLimit) {
      props.setPrompt(text);
    }
  };

  const errorShowFlag = !props.detail;

  return (
    <>
      This is Form component!
      <p>
        {" "}
        Share your brand&apos;s story; I&apos;ll craft a snippet, suggest a logo
        name, and keywords
      </p>
      <input
        type='text'
        value={props.prompt}
        placeholder='hand embriodery busines'
        onChange={(e) => updatePromptValue(e.currentTarget.value)}></input>
      <div>
        {props.prompt.length}/{props.charLimit}
      </div>
      <p hidden={errorShowFlag}>{props.detail}</p>
      <button
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}>
        Submit
      </button>
    </>
  );
};

export default Form;
