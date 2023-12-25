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
    const element = <div key={i}>{props.names[i]}</div>;
    brandNamesElement.push(element);
  }

  const keywordsElement = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div key={i}>#{props.keywords[i]}</div>;
    keywordsElement.push(element);
  }

  return (
    <>
      <div>
        <div>
          <div>
            <b>Prompt</b>
          </div>
          <div>{props.prompt}</div>
        </div>
        Here are your results:
        <div>
          <div>
            <b>Snippet</b>
          </div>
          <div>{props.snippet}</div>
        </div>
        <div>
          <div>
            <b>BrandNames</b>
          </div>
          <div>{brandNamesElement}</div>
        </div>
        <div>
          <div>
            <b>Keywords</b>
          </div>
          <div>{keywordsElement}</div>
        </div>
      </div>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default Results;
