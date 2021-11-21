import React, { useEffect, useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import { trimText } from "../utils/helpers";

export interface StateProps {
  fileUrl: string;
  text: string;
}

export const Generated: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileUrl, text } = location.state as StateProps;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log({ fileUrl, text });
    if (!fileUrl || !text) {
      navigate("/", { replace: true });
    }

    setTimeout(() => {
      setShowModal(true);
    }, 3000);
  }, []);

  console.log({ fileUrl, text });

  const newText = trimText(text);

  return (
    <div className="relative flex h-screen w-full bg-[#111111] overflow-hidden">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="px-6 py-6 text-black bg-white rounded-md shadow-xl">
            <p className="text-lg font-semibold">
              Would appreciate a star on{" "}
              <a
                className="text-blue-500"
                target="_blank"
                href="https://github.com/princejoogie/css-portrait-gen"
              >
                github{" "}
              </a>{" "}
              :)
            </p>

            <hr className="my-2 border-gray-300" />

            <div className="py-3">
              <p>Follow me on my socials:</p>
              <div className="flex mt-1 space-x-3">
                <a href="https://github.com/princejoogie/" target="_blank">
                  <AiFillGithub className="text-xl text-gray-700" />
                </a>
                <a
                  href="https://www.instagram.com/princecaarlo/"
                  target="_blank"
                >
                  <AiFillInstagram className="text-xl text-gray-700" />
                </a>
                <a
                  href="https://www.linkedin.com/in/princejoogie/"
                  target="_blank"
                >
                  <AiFillLinkedin className="text-xl text-gray-700" />
                </a>
              </div>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex items-center justify-between">
              <p className="text-xs">
                {"Made with <3 by "}
                <a
                  href="https://princecaarlo.tech"
                  target="_blank"
                  className="text-blue-300"
                >
                  Prince Carlo Juguilon
                </a>
                {" :3"}
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 ml-8 text-xs text-white bg-green-500 rounded "
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
      <p
        style={{
          backgroundClip: "content-box",
          backgroundImage: `url(${fileUrl})`,
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
        }}
        id="text-background"
        className="w-full text-xs leading-none text-justify"
      >
        {newText}
      </p>
    </div>
  );
};
