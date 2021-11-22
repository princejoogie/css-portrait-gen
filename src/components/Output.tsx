import React from "react";
import { defaultText, IOptions, trimText } from "../utils/helpers";

interface OutputProps {
  options: IOptions;
  file: File | null;
  text: string;
}

export const Output: React.FC<OutputProps> = ({ options, file, text }) => {
  return (
    <p
      style={{
        backgroundImage: `url(${file ? URL.createObjectURL(file) : ""})`,
        fontSize: options.fontSize,
        letterSpacing: options.letterSpacing,
        lineHeight: `${options.lineHeight}px`,
        backgroundSize: options.backgroundSize,
      }}
      className="absolute inset-0 text-justify text-transparent bg-scroll bg-center bg-no-repeat bg-clip-text"
    >
      {trimText(!!text ? text : defaultText, options)}
    </p>
  );
};
