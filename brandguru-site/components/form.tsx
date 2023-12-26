interface FormProps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  charLimit: number;
  detail: string;
}

const Form: React.FC<FormProps> = (props) => {
  const isPromptValid = props.prompt.length < props.charLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= props.charLimit) {
      props.setPrompt(text);
    }
  };

  let statusColor = 'text-cyan-600';
  let statusColorChar = '';
  let statusText = null;
  if(!isPromptValid){
    statusColor = 'text-red-600';
    statusColorChar = 'text-red-600';
    statusText = `Input must be less than ${props.charLimit} characters`;
  }
  else {
    const errorShowFlag = !props.detail;
    if (!errorShowFlag) {
      statusColor = 'text-red-600';
      statusColorChar = 'text-cyan-600';
      statusText = `${props.detail}`;
    }
  }

  const gradientTextStyle =
    "text-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-600 font-light w-fit mx-auto";

  return (
    <>
      <div className={gradientTextStyle + "mb-6 text-base font-normal"}>
        <p>
          {" "}
          Share your brand&apos;s story; I&apos;ll craft a snippet, suggest some
          brand names, and keywords for you :)
        </p>
      </div>

      <input
        className='mt-2 p-2 w-full border-2 border-cyan-500 rounded-md bg-slate text-blue-900  text-sm placeholder-slate-400'
        type='text'
        value={props.prompt}
        placeholder='AI startup to detect plagarism'
        onChange={(e) => updatePromptValue(e.currentTarget.value)}></input>

      <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
        <div>{statusText}</div>
        <div className={statusColorChar}>
          {props.prompt.length}/{props.charLimit}
        </div>
      </div>

      <button
      className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-white text-lg"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}>
        Submit
      </button>
    </>
  );
};

export default Form;
