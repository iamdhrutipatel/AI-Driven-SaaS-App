import React from "react";

interface LogoResultsProps {
  url: string;
  onBack: any;
}

const LogoResults: React.FC<LogoResultsProps> = (props) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = props.url;
    link.download = "logo.png";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='my-6'>
        <img
          src={props.url}
          alt='Logo'
          className='w-full max-h-80 h-auto'
          style={{maxWidth: "100%", height: "auto"}}
        />
      </div>
      <button className='buttonSubmitBack mb-4' onClick={handleDownload}>
        Download Logo
      </button>
      <button className='buttonSubmitBack' onClick={props.onBack}>
        Back
      </button>
    </div>
  );
};

export default LogoResults;
