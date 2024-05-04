import React, {useState, useEffect} from "react";
import axios from "axios";

interface ResultsProps {
  prompt: string;
  tagline: string;
  snippet: string;
  names: string[];
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  const [availability, setAvailability] = useState<boolean[]>([]);

  useEffect(() => {
    const checkTrademarkAvailability = async () => {
      try {
        const trademarkAvailability = await Promise.all(
          props.names.map(async (brandName) => {
            try {
              const response = await axios.get(
                `https://uspto-trademark.p.rapidapi.com/v1/trademarkSearch/${encodeURIComponent(
                  brandName.toLowerCase()
                )}/active`,
                {
                  headers: {
                    "X-RapidAPI-Key":
                      "b85729ce1amsh7cf40c322fc7e15p11433djsn6321be2b20da",
                    "X-RapidAPI-Host": "uspto-trademark.p.rapidapi.com",
                  },
                }
              );
              return response.data.count > 0 ? false : true;
            } catch (error) {
              console.error(
                `Error checking trademark availability for ${brandName}: `,
                error
              );
              return false;
            }
          })
        );
        setAvailability(trademarkAvailability);
      } catch (error) {
        console.error("Error checking trademark availability: ", error);
      }
    };

    checkTrademarkAvailability();
  }, [props.names]);

  const brandNamesElement = props.names.map((brandName, index) => {
    const words = brandName.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const capitalizedSentence = capitalizedWords.join(" ");
    const availabilityIcon = availability[index] ? (
      <span style={{color: "green"}}>✓</span>
    ) : (
      <span style={{color: "red"}}>x</span>
    );
    return (
      <div className='brandNamesKeywords' key={index}>
        {capitalizedSentence} {availabilityIcon}
      </div>
    );
  });

  const keywordsElement = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = (
      <div className='brandNamesKeywords' key={i}>
        #{props.keywords[i]}
      </div>
    );
    keywordsElement.push(element);
  }

  const brandNamesElementHolder = (
    <div className='elementHolder'>{brandNamesElement}</div>
  );
  const keywordsElementHolder = (
    <div className='elementHolder'>{keywordsElement}</div>
  );

  const resultSection = (label: string, tip: any, body: any) => {
    return (
      <div className='bg-gray-100 p-4 my-3 rounded-md'>
        <div className='gradidentTextResults'>{label}</div>
        <div className='text-slate-700 font-medium'>{tip}</div>
        <div className='text-slate-600 text-base font-semibold'>{body}</div>
      </div>
    );
  };

  return (
    <>
      <div>
        {resultSection("Prompt", "", props.prompt)}
        {resultSection("Brand Snippet", "", props.snippet)}
        {resultSection("Tagline", "", props.tagline)}
        {resultSection(
          "Brand Names",
          <div>
            <p>
              <span style={{color: "green"}}>✓</span> : Available,{" "}
              <span style={{color: "red"}}>x</span> : Not Available Brand Name
            </p>
            <br />
          </div>,
          brandNamesElementHolder
        )}
        {resultSection("Keywords", "", keywordsElementHolder)}
      </div>
      <button className='buttonSubmitBack' onClick={props.onBack}>
        Back
      </button>
    </>
  );
};

export default Results;
