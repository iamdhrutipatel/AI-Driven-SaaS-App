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
    const element = <div className="bg-gradient-to-r from-cyan-200 to-cyan-300 disabled:opacity-50 rounded-md p-1 px-2 text-sm" key={i}>{props.names[i]}</div>;
    brandNamesElement.push(element);
  }

  const keywordsElement = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div className="bg-gradient-to-r from-cyan-200 to-cyan-300 disabled:opacity-50 rounded-md p-1 px-2 text-sm" key={i}>#{props.keywords[i]}</div>;
    keywordsElement.push(element);
  }

  const brandNamesElementHolder = <div className="flex flex-wrap gap-2">{brandNamesElement}</div>
  const keywordsElementHolder = <div className="flex flex-wrap gap-3">{keywordsElement}</div>

  const gradientTextStyle =
    "text-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-600 text-xl font-bold mb-1";

  const resultSection = (label: string, body: any) => {
    return(
    <div className="bg-gray-100 p-4 my-3 rounded-md">
      <div className={gradientTextStyle}>
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
        className='bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-white text-lg'
        onClick={props.onBack}>
        Back
      </button>
    </>
  );
};

export default Results;
