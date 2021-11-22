import React, { useState } from "react";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";
import { BsArrowRepeat, BsShareFill, BsArrowsFullscreen } from "react-icons/bs";
import { useNavigate } from "react-router";

import { Footer, Container, Navbar } from "../components";
import {
  defaultText,
  handleAnalytics,
  trimText,
  defaultOptions,
  IOptions,
} from "../utils/helpers";

import "./home.css";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Config
  const [fontSize, setFontSize] = useState(12);
  const [fontSpacing, setFontSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(8);
  const [objectFit, setObjectFit] = useState<IOptions["objectFit"]>("cover");

  console.log({
    file,
    text,
    fontSize,
    fontSpacing,
    lineHeight,
    objectFit,
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const generate = () => {
    if (file && text) {
      const fileUrl = URL.createObjectURL(file);
      handleAnalytics("GENERATE_PORTRAIT", { text: text.trim() });
      navigate("/generated", { state: { fileUrl, text: text.trim() } });
    } else {
      setError("Please select a file and enter text");
    }
  };

  const createShareableLink = () => {
    const options: IOptions = {
      fontSize,
      fontSpacing,
      lineHeight,
      objectFit,
    };
  };

  const resetSettings = () => {
    setFontSize(defaultOptions.fontSize);
    setFontSpacing(defaultOptions.fontSpacing);
    setLineHeight(defaultOptions.lineHeight);
    setObjectFit(defaultOptions.objectFit);
  };

  return (
    <div>
      <Navbar />

      <main className="my-10 mb-44">
        <Container>
          <div className="flex flex-col space-x-0 space-y-4 lg:space-x-4 lg:space-y-0 lg:flex-row">
            {/* Config */}
            <div className="flex flex-col flex-1 space-y-4">
              <h3 className="text-xl">Options</h3>

              <div>
                <label className="cursor-pointer">
                  <input
                    onChange={handleFile}
                    className="hidden"
                    type="file"
                    name="image_input"
                    accept="image/*"
                    id="image_input"
                  />
                  <p className="flex items-center justify-center px-4 py-2 space-x-1 font-semibold transition-opacity duration-150 bg-gray-800 rounded shadow hover:opacity-70">
                    <MdOutlineFileUpload className="text-lg" />
                    <span>Choose a background image</span>
                  </p>
                </label>

                {/* TODO: Remove */}
                <span className="block mt-1 text-xs text-gray-400">
                  {file?.name}
                </span>
              </div>

              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (!!error) setError("");
                }}
                placeholder="Enter lyrics or any text here..."
                className="w-full px-3 py-2 text-white bg-transparent border border-gray-700 rounded outline-none resize-none h-60 hover:border-blue-500"
                name="input_text"
                id="input_text"
              />

              <form className="grid w-full grid-cols-2 gap-2 px-3 py-2 text-sm text-gray-400 border border-gray-700 rounded hover:border-blue-500">
                <div>
                  <label htmlFor="font_size">Font Size: {fontSize}px</label>
                  <input
                    className="w-full"
                    type="range"
                    min={4}
                    step={1}
                    max={30}
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    name="font_size"
                    id="font_size"
                  />
                </div>

                <div>
                  <label htmlFor="font_spacing">
                    Font Spacing: {fontSpacing}
                  </label>
                  <input
                    className="w-full"
                    type="range"
                    min={-3}
                    step={1}
                    max={10}
                    value={fontSpacing}
                    onChange={(e) => setFontSpacing(parseInt(e.target.value))}
                    name="font_spacing"
                    id="font_spacing"
                  />
                </div>

                <div>
                  <label htmlFor="line_height">
                    Line Height: {lineHeight}px
                  </label>
                  <input
                    className="w-full"
                    type="range"
                    min={4}
                    step={1}
                    max={30}
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseInt(e.target.value))}
                    name="line-height"
                    id="line_height"
                  />
                </div>

                <div>
                  <label htmlFor="object_fit block">Background Fit</label>
                  <select
                    name="object_fit"
                    id="object_fit"
                    className="w-full px-2 py-1 text-gray-300 bg-gray-800"
                    value={objectFit}
                    onChange={(e) =>
                      setObjectFit(e.target.value as IOptions["objectFit"])
                    }
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </form>

              <div className="flex items-center w-full space-x-2">
                <button className="relative flex items-center justify-center flex-1 py-2 space-x-2 transition-opacity duration-150 bg-gray-600 rounded hover:opacity-70">
                  <BsArrowsFullscreen className="absolute text-lg left-3" />
                  <p>Full Screen</p>
                </button>

                <button className="grid w-10 h-10 p-2 text-gray-300 transition-opacity duration-150 bg-green-600 rounded hover:opacity-70 place-items-center">
                  <MdOutlineFileDownload className="text-2xl" />
                </button>
                <button className="grid w-10 h-10 p-2 text-gray-300 transition-opacity duration-150 bg-blue-600 rounded hover:opacity-70 place-items-center">
                  <BsShareFill className="text-xl" />
                </button>
                <button
                  onClick={resetSettings}
                  className="grid w-10 h-10 p-2 text-gray-300 transition-opacity duration-150 bg-red-600 rounded hover:opacity-70 place-items-center"
                >
                  <BsArrowRepeat className="text-2xl" />
                </button>
              </div>
            </div>

            <hr className="block border-gray-700 lg:hidden" />

            {/* Preview */}
            <div className="lg:flex-[2] relative flex flex-col space-y-4">
              <h3 className="text-xl">Preview</h3>

              <div
                className={`relative w-full overflow-hidden h-96 lg:h-[512px] rounded ${
                  file ? "bg-black" : "bg-gray-800"
                }`}
              >
                <p
                  style={{
                    backgroundImage: `url(${
                      file ? URL.createObjectURL(file) : ""
                    })`,
                    fontSize,
                    letterSpacing: fontSpacing,
                    lineHeight: `${lineHeight}px`,
                    backgroundSize: objectFit,
                  }}
                  className="absolute inset-0 text-justify text-transparent bg-scroll bg-center bg-no-repeat bg-clip-text"
                >
                  {trimText(!!text ? text : defaultText)}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
