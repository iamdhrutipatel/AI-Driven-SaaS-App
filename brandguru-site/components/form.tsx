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

  let statusColor = "textCyan";
  let statusColorChar = "";
  let statusText = null;
  if(!isPromptValid){
    statusColor = "textError";
    statusColorChar = "textError";
    statusText = `Input must be less than ${props.charLimit} characters`;
  }
  else {
    const errorShowFlag = !props.detail;
    if (!errorShowFlag) {
      statusColor = "textError";
      statusColorChar = "textCyan";
      statusText = `${props.detail}`;
    }
  }

  return (
    <>
      <div className={"gradientTextStyle" + " text-base font-normal"}>
        <p>
          {" "}
          Share your brand&apos;s story; I&apos;ll craft a snippet, suggest some
          brand names, and keywords for you :)
        </p>
      </div>

      <input
        className="formBorder"
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
      className="buttonSubmitBack"
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}>
        Submit
      </button>
    </>
  );
};

export default Form;
