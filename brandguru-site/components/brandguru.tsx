import React from "react";
import Form from "@/components/form";
import Results from "@/components/results";

const BrandGuru: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [names, setBrandNames] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);
  const [detail, setDetail] = React.useState("");
  const [hasResults, setHasResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const CHAR_LIMIT: number = 40;
  const ENDPOINT: string = `https://494dlfchub.execute-api.us-west-1.amazonaws.com/prod/generate_all_together`;
  const onSubmit = () => {
    console.log("Submitting: " + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
      setSnippet(data.snippet);
      setBrandNames(data.names);
      setKeywords(data.keywords);
      setDetail(data.detail);
      setHasResults(true);
      setIsLoading(false);
  };

  const onReset = () => {
    setPrompt("");
    setHasResults(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResults && snippet) {
    displayedElement = (
      <Results
        prompt={prompt}
        snippet={snippet}
        names={names}
        keywords={keywords}
        onBack={onReset}
      />
    );
  } 
  else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        charLimit={CHAR_LIMIT}
        detail={detail}
      />
    );
  }

  return (
    <>
      <h1>BrandGuru - An AI Assistant for Marketing</h1>
      {displayedElement}
    </>
  );
};

export default BrandGuru;