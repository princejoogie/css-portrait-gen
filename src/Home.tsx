import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MdOutlineFileUpload } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { Container } from "./Container";
import { useNavigate } from "react-router";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const generate = () => {
    if (file && text) {
      console.log("Generating");
      const fileUrl = URL.createObjectURL(file);
      navigate("/generated", { state: { fileUrl, text: text.trim() } });
    } else {
      setError("Please select a file and enter text");
    }
  };

  return (
    <div>
      <Navbar />

      <main className="my-10 mb-44">
        <Container>
          {!!error && (
            <p className="w-full pb-6 text-sm text-center text-red-500">
              {error}
            </p>
          )}
        </Container>

        <Container className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col flex-1 w-full space-y-2">
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

            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="image_preview"
                className="object-contain w-full bg-gray-800 h-80"
              />
            ) : (
              <div className="w-full h-64 bg-gray-800 rounded" />
            )}
          </div>

          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (!!error) setError("");
              }}
              placeholder="Enter lyrics or any text here..."
              className="w-full h-full px-3 py-2 text-white bg-transparent border border-gray-700 rounded"
              name="input_text"
              id="input_text"
              rows={14}
            ></textarea>
          </div>
        </Container>

        <Container className="flex flex-col items-center justify-center mt-10">
          <button
            onClick={generate}
            className="flex items-center justify-center w-full px-10 py-2 space-x-2 font-bold uppercase transition-opacity duration-150 bg-blue-500 rounded lg:w-min hover:opacity-70"
          >
            <BsFillGearFill className="text-lg" />
            <span>Generate</span>
          </button>
          <span className="mt-1 text-xs text-gray-400">
            P.S. hitting refresh on generated page will not work.
          </span>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
