interface ResultsProps {
  prompt: string;
  snippet: string;
  names: string[];
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  const brandNamesElement = [];
  for (let i = 0; i < props.names.length; i++) {
    const element = <div className="brandNamesKeywords" key={i}>{props.names[i]}</div>;
    brandNamesElement.push(element);
  }

  const keywordsElement = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div className="brandNamesKeywords" key={i}>#{props.keywords[i]}</div>;
    keywordsElement.push(element);
  }

  const brandNamesElementHolder = <div className="elementHolder">{brandNamesElement}</div>
  const keywordsElementHolder = <div className="elementHolder">{keywordsElement}</div>

  const resultSection = (label: string, body: any) => {
    return(
    <div className="bg-gray-100 p-4 my-3 rounded-md">
      <div className="gradidentTextResults">
        {label}
      </div>
      <div className="text-slate-600 text-base font-semibold">{body}</div>
    </div>
    );
  };

  return (
    <>
      <div>
        {resultSection("Prompt", props.prompt)}
        {resultSection("Brand Snippet", props.snippet)}
        {resultSection("Brand Names", brandNamesElementHolder)}
        {resultSection("Keywords", keywordsElementHolder)}
      </div>
      <button
        className="buttonSubmitBack"
        onClick={props.onBack}>
        Back
      </button>
    </>
  );
};

export default Results;
