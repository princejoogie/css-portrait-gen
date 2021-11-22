import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";
import { BsArrowRepeat, BsShareFill, BsArrowsFullscreen } from "react-icons/bs";
import { HiOutlineExternalLink, HiOutlineClipboardCopy } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { saveAs } from "file-saver";
import { v4 } from "uuid";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import html2canvas from "html2canvas";

import { Footer, Container, Navbar, Output } from "../components";
import {
  defaultOptions,
  IOptions,
  getFileExtension,
  makeId,
  ShareableData,
  copyToClipboard,
} from "../utils/helpers";
import { useUpload } from "../hooks";
import { storage, db } from "../utils/database";

export const Home: React.FC = () => {
  const upload = useUpload();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [creatingLink, setCreatingLink] = useState(false);
  const [urlId, setUrlId] = useState("");

  // Config
  const [fontSize, setFontSize] = useState(12);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(8);
  const [backgroundSize, setBackgroundSize] =
    useState<IOptions["backgroundSize"]>("cover");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFullScreen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const createShareableLink = async (): Promise<string | null> => {
    if (file) {
      setCreatingLink(true);
      const options: IOptions = {
        fontSize,
        letterSpacing,
        lineHeight,
        backgroundSize,
      };

      const fileExtension = getFileExtension(file);
      const name = `uploads/${v4()}.${fileExtension}`;
      const storageRef = ref(storage, name);
      const url = await upload(file, storageRef);

      if (url) {
        const data: ShareableData = {
          options,
          fileUrl: url,
          text,
        };

        let id = makeId();
        let i = 0;

        while (i < 1168675000) {
          i++;
          const docRef = doc(db, "uploads", id);
          const docSnap = await getDoc(docRef);
          const exists = !!docSnap.exists();

          if (!exists) {
            await setDoc(docRef, data);
            break;
          }

          id = makeId();
        }

        setCreatingLink(false);
        return id;
      } else {
        setCreatingLink(false);
        return null;
      }
    }

    return null;
  };

  const saveToDevice = async () => {
    try {
      const el = document.getElementById("preview_image");
      if (el) {
        const canvas = await html2canvas(el);
        canvas.toBlob((blob) => {
          if (blob) saveAs(blob, "preview.png");
        });
      }
    } catch (e) {
      console.log("ERROR_SAVING:", e);
    }
  };

  const resetSettings = () => {
    setFontSize(defaultOptions.fontSize);
    setLetterSpacing(defaultOptions.letterSpacing);
    setLineHeight(defaultOptions.lineHeight);
    setBackgroundSize(defaultOptions.backgroundSize);
  };

  return fullScreen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative w-full h-full">
        <button
          onClick={() => setFullScreen(false)}
          className="absolute top-0 right-0 z-50 p-4 m-4 text-3xl transition-opacity duration-150 bg-gray-700 rounded-full shadow hover:opacity-80"
        >
          <IoCloseSharp />
        </button>
        <Output
          options={{
            backgroundSize,
            fontSize,
            letterSpacing,
            lineHeight,
          }}
          file={file}
          text={text}
        />
      </div>
    </div>
  ) : (
    <div>
      {!!urlId && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-black bg-white rounded w-full md:w-[356px] lg:w-[512px] mx-4">
            <div className="flex items-center justify-between px-4 py-2">
              <h4 className="text-lg">Congratulations!</h4>

              <button onClick={() => setUrlId("")}>
                <IoCloseSharp className="text-lg" />
              </button>
            </div>
            <hr />

            <div className="p-4 text-gray-700">
              <p className="text-xl">Your shareable link is ready!</p>

              <div className="flex items-center px-4 py-2 mt-2 border border-gray-300 rounded shadow-md bg-gray-50">
                <Link
                  to={`share/${urlId}`}
                  target="_blank"
                  className="flex-1 text-sm text-blue-500"
                >{`${window.location.host}/share/${urlId}`}</Link>

                <button
                  className="active:opacity-50"
                  onClick={() =>
                    copyToClipboard(`${window.location.host}/share/${urlId}`)
                  }
                >
                  <HiOutlineClipboardCopy className="text-2xl text-gray-600" />
                </button>

                <Link
                  to={`share/${urlId}`}
                  target="_blank"
                  className="active:opacity-50"
                >
                  <HiOutlineExternalLink className="text-2xl text-gray-600" />
                </Link>
              </div>
            </div>
            <hr />

            <div className="flex items-center justify-end px-4 py-2 text-white">
              <button
                onClick={() => setUrlId("")}
                className="px-4 py-1 text-sm text-red-500 capitalize transition-opacity duration-150 rounded hover:opacity-70"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-black bg-white rounded w-full md:w-[356px] lg:w-[512px] mx-4">
            <div className="flex items-center justify-between px-4 py-2">
              <h4 className="text-lg">Confirmation</h4>

              <button onClick={() => setShowConfirm(false)}>
                <IoCloseSharp className="text-lg" />
              </button>
            </div>
            <hr />

            <div className="p-4 text-gray-700">
              <p className="text-xl">Are you sure?</p>
              <span className="text-sm text-gray-500">
                creating a shareable link will be public.
              </span>
            </div>
            <hr />

            <div className="flex items-center justify-end px-4 py-2 text-white">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1 text-sm text-red-500 capitalize transition-opacity duration-150 rounded hover:opacity-70"
              >
                cancel
              </button>

              <button
                onClick={async () => {
                  const urlId = await createShareableLink();
                  if (!!urlId) setUrlId(urlId);
                  setShowConfirm(false);
                }}
                className="px-4 py-1 text-sm uppercase transition-opacity duration-150 bg-green-600 rounded hover:opacity-70"
              >
                {creatingLink ? "creating..." : "ok"}
              </button>
            </div>
          </div>
        </div>
      )}

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
                    Font Spacing: {letterSpacing}
                  </label>
                  <input
                    className="w-full"
                    type="range"
                    min={-3}
                    step={1}
                    max={10}
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
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
                    className="w-full px-2 py-1 text-gray-300 transition-opacity duration-150 bg-gray-800 rounded hover:opacity-70"
                    value={backgroundSize}
                    onChange={(e) =>
                      setBackgroundSize(
                        e.target.value as IOptions["backgroundSize"]
                      )
                    }
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </form>

              <div>
                <div className="flex items-center w-full space-x-2">
                  <button
                    onClick={() => setFullScreen(true)}
                    disabled={!file}
                    className="relative flex items-center justify-center flex-1 py-2 space-x-2 transition-opacity duration-150 bg-gray-600 rounded disabled:cursor-not-allowed disabled:opacity-20 hover:opacity-70"
                  >
                    <BsArrowsFullscreen className="absolute text-lg left-3" />
                    <p>Full Screen</p>
                  </button>

                  <button
                    // onClick={saveToDevice}
                    // disabled={!file}
                    disabled={true}
                    className="grid w-10 h-10 p-2 text-gray-300 transition-opacity duration-150 bg-green-600 rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-70 place-items-center"
                  >
                    <MdOutlineFileDownload className="text-2xl" />
                  </button>
                  <button
                    onClick={() => setShowConfirm(true)}
                    disabled={!file}
                    className="grid w-10 h-10 p-2 text-gray-300 transition-opacity duration-150 bg-blue-600 rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-70 place-items-center"
                  >
                    <BsShareFill className="text-xl" />
                  </button>
                  <button
                    onClick={resetSettings}
                    disabled={
                      fontSize === defaultOptions.fontSize &&
                      letterSpacing === defaultOptions.letterSpacing &&
                      lineHeight === defaultOptions.lineHeight &&
                      backgroundSize === defaultOptions.backgroundSize
                    }
                    className="grid w-10 h-10 p-2 text-gray-300 transition-opacity duration-150 bg-red-600 rounded hover:opacity-70 place-items-center disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <BsArrowRepeat className="text-2xl" />
                  </button>
                </div>
                <span className="block mt-1 text-xs text-center text-green-500">
                  Save to device coming soon!
                </span>
              </div>
            </div>

            <hr className="block border-gray-700 lg:hidden" />

            {/* Preview */}
            <div className="lg:flex-[2] relative flex flex-col space-y-4">
              <h3 className="text-xl">Preview</h3>

              <div
                id="preview_image"
                className={`relative w-full overflow-hidden h-96 lg:h-[512px] rounded ${
                  file ? "bg-black" : "bg-gray-800"
                }`}
              >
                <Output
                  options={{
                    backgroundSize,
                    fontSize,
                    letterSpacing,
                    lineHeight,
                  }}
                  file={file}
                  text={text}
                />
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
