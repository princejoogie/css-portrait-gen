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
            <p className="text-red-500 text-center w-full text-sm pb-6">
              {error}
            </p>
          )}
        </Container>

        <Container className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 w-full flex flex-col space-y-2">
            <label className="cursor-pointer">
              <input
                onChange={handleFile}
                className="hidden"
                type="file"
                name="image_input"
                id="image_input"
              />
              <p className="px-4 py-2 rounded shadow bg-gray-800 font-semibold flex items-center justify-center space-x-1 hover:opacity-70 transition-opacity duration-150">
                <MdOutlineFileUpload className="text-lg" />
                <span>Choose a background image</span>
              </p>
            </label>

            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="image_preview"
                className="w-full object-contain h-80 bg-gray-800"
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
              className="w-full h-full bg-transparent text-white border border-gray-700 rounded px-3 py-2"
              name="input_text"
              id="input_text"
              rows={14}
            ></textarea>
          </div>
        </Container>

        <Container className="flex items-center justify-center mt-10">
          <button
            onClick={generate}
            className="bg-blue-500 px-10 py-2 rounded uppercase font-bold w-full lg:w-min flex items-center justify-center space-x-2 hover:opacity-70 transition-opacity duration-150"
          >
            <BsFillGearFill className="text-lg" />
            <span>Generate</span>
          </button>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
