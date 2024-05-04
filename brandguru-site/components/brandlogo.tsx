import React from "react";
import Form from "@/components/logoform";
import Results from "@/components/logoresults";
import Image from "next/image";
import logo from "@/public/BrandGuruLogo.png";

const BrandGuruLogo: React.FC = () => {
  const [brand_name, setBrandName] = React.useState("");
  const [brand_identity, setBrandIdentity] = React.useState("");
  const [design_qualities, setDesignQualities] = React.useState("");
  const [brand_values, setBrandValues] = React.useState("");
  const [additional_descriptors, setAdditionalDescriptors] = React.useState("");
  const [style_qualities, setStyleQualities] = React.useState("");
  const [color_preferences, setColorPreferences] = React.useState("");
  const [theme_description, setThemeDescription] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [hasResults, setHasResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const CHAR_LIMIT: number = 51;
  const IMAGEENDPOINT: string = `https://494dlfchub.execute-api.us-west-1.amazonaws.com/prod/generate_image`;

  const onSubmit = () => {
    setIsLoading(true);
    fetch(`${IMAGEENDPOINT}?brand_name=${brand_name}&brand_identity=${brand_identity}&design_qualities=${design_qualities}&brand_values=${brand_values}&additional_descriptors=${additional_descriptors}&style_qualities=${style_qualities}&color_preferences=${color_preferences}&theme_description=${theme_description}`)
      .then((res) => res.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    setUrl(data.url);
    setDetail(data.detail);
    setHasResults(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setBrandName("");
    setBrandIdentity("");
    setDesignQualities("");
    setBrandValues("");
    setAdditionalDescriptors("");
    setStyleQualities("");
    setColorPreferences("");
    setThemeDescription("");
    setHasResults(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResults && url) {
    displayedElement = (
      <Results
        url={url}
        onBack={onReset}
      />
    );
  } else {
    displayedElement = (
      <Form
        brand_name={brand_name}
        setBrandName={setBrandName}
        brand_identity={brand_identity}
        setBrandIdentity={setBrandIdentity}
        design_qualities={design_qualities}
        setDesignQualities={setDesignQualities}
        brand_values={brand_values}
        setBrandValues={setBrandValues}
        additional_descriptors={additional_descriptors}
        setAdditionalDescriptors={setAdditionalDescriptors}
        style_qualities={style_qualities}
        setStyleQualities={setStyleQualities}
        color_preferences={color_preferences}
        setColorPreferences={setColorPreferences}
        theme_description={theme_description}
        setThemeDescription={setThemeDescription}
        onSubmit={onSubmit}
        isLoading={isLoading}
        charLimit={CHAR_LIMIT}
        detail={detail}
      />
    );
  }

  return (
    <div className='h-screen flex'>
      <div className='max-w-md m-auto p-2'>
        <div className='bg-gray-50 p-6 rounded-md text-black'>
          <div className='flex flex-col items-center justify-center text-center my-6'>
            <Image src={logo} width={140} alt={"BrandGuru Logo"} />
            <h1 className={"gradientTextStyle" + " text-4xl font-medium"}>
              BrandGuru
            </h1>
            <div className={"gradientTextStyle" + " text-base font-normal"}>
              Your AI Branding Assistant
            </div>
          </div>
          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default BrandGuruLogo;