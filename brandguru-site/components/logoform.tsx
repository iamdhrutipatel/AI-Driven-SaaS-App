import React from "react";

interface LogoFormProps {
  brand_name: string;
  setBrandName: React.Dispatch<React.SetStateAction<string>>;
  brand_identity: string;
  setBrandIdentity: React.Dispatch<React.SetStateAction<string>>;
  design_qualities: string;
  setDesignQualities: React.Dispatch<React.SetStateAction<string>>;
  brand_values: string;
  setBrandValues: React.Dispatch<React.SetStateAction<string>>;
  additional_descriptors: string;
  setAdditionalDescriptors: React.Dispatch<React.SetStateAction<string>>;
  style_qualities: string;
  setStyleQualities: React.Dispatch<React.SetStateAction<string>>;
  color_preferences: string;
  setColorPreferences: React.Dispatch<React.SetStateAction<string>>;
  theme_description: string;
  setThemeDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: any;
  isLoading: boolean;
  charLimit: number;
  detail: string;
}

const LogoForm: React.FC<LogoFormProps> = (props) => {
  const isPromptValid =
    props.brand_name.length < props.charLimit &&
    props.brand_identity.length < props.charLimit &&
    props.design_qualities.length < props.charLimit &&
    props.brand_values.length < props.charLimit &&
    props.additional_descriptors.length < props.charLimit &&
    props.style_qualities.length < props.charLimit &&
    props.color_preferences.length < props.charLimit &&
    props.theme_description.length < props.charLimit;
  const updatePromptValue = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.length <= props.charLimit) {
      setter(value);
    }
  };

  let statusColor = "textCyan";
  let statusColorChar = "";
  let statusText = null;
  if (!isPromptValid) {
    statusColor = "textError";
    statusColorChar = "textError";
    statusText = `Input must be less than ${props.charLimit} characters`;
  } else if (props.detail) {
    statusColor = "textError";
    statusColorChar = "textCyan";
    statusText = `${props.detail}`;
  }

  return (
    <>
      <div className={"gradientTextStyle text-base font-semibold"}>
        <p>
          Share your brand identity; I&rsquo;ll craft a unique brand logo for
          you!
        </p>
      </div>

      {[
        {
          label: "Brand Name",
          placeholder: "Evergreen",
          value: props.brand_name,
          setter: props.setBrandName,
        },
        {
          label: "Brand Identity",
          placeholder: "Eco-friendly home products",
          value: props.brand_identity,
          setter: props.setBrandIdentity,
        },
        {
          label: "Design Qualities",
          placeholder: "Elegance and modernity",
          value: props.design_qualities,
          setter: props.setDesignQualities,
        },
        {
          label: "Brand Values",
          placeholder: "Environmental sustainability",
          value: props.brand_values,
          setter: props.setBrandValues,
        },
        {
          label: "Additional Descriptors",
          placeholder: "Sophisticated and impactful",
          value: props.additional_descriptors,
          setter: props.setAdditionalDescriptors,
        },
        {
          label: "Style Qualities",
          placeholder: "Contemporary and minimalist",
          value: props.style_qualities,
          setter: props.setStyleQualities,
        },
        {
          label: "Color Preferences",
          placeholder: "Earth tones",
          value: props.color_preferences,
          setter: props.setColorPreferences,
        },
        {
          label: "Theme Description",
          placeholder: "Natural",
          value: props.theme_description,
          setter: props.setThemeDescription,
        },
      ].map(({label, placeholder, value, setter}) => (
        <div className='flex flex-col mt-2' key={label}>
          <label className={`textCyan font-semibold mb-1`}>{label}</label>
          <input
            className='formBorder'
            type='text'
            value={value}
            placeholder={placeholder}
            onChange={(e) => updatePromptValue(e.currentTarget.value, setter)}
          />
          <span className={`mt-1 ${statusColor} text-sm flex justify-end`}>
            <div className={statusColorChar}>
              {value.length}/{props.charLimit}
            </div>
          </span>
        </div>
      ))}

      <div className={`${statusColor} my-2 mb-6 text-sm`}>{statusText}</div>

      <button
        className={`buttonSubmitBack ${
          props.isLoading || !isPromptValid ? "buttonDisabled" : ""
        }`}
        onClick={props.onSubmit}
        disabled={props.isLoading || !isPromptValid}>
        Submit
      </button>
    </>
  );
};

export default LogoForm;
