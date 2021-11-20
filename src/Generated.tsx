import React, { useEffect, useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";

interface StateProps {
  fileUrl: string;
  text: string;
}

const trimText = (text: string) => {
  const max = 10000;
  const og = text.split(" ");
  const oglen = og.length;
  if (oglen > max) {
    return og.slice(0, max).join(" ");
  }

  let i = 0;
  const words = text.split(" ");
  let len = words.length;

  while (len < max) {
    words.push(words[i]);
    if (i > oglen - 1) i = 0;
    else i++;

    len++;
  }

  return words.join(" ");
};

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
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md px-6 shadow-xl py-6 text-black">
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

            <hr className="border-gray-300 my-2" />

            <div className="py-3">
              <p>Follow me on my socials:</p>
              <div className="flex space-x-3 mt-1">
                <a href="https://github.com/princejoogie/" target="_blank">
                  <AiFillGithub className="text-gray-700 text-xl" />
                </a>
                <a
                  href="https://www.instagram.com/princecaarlo/"
                  target="_blank"
                >
                  <AiFillInstagram className="text-gray-700 text-xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/princejoogie/"
                  target="_blank"
                >
                  <AiFillLinkedin className="text-gray-700 text-xl" />
                </a>
              </div>
            </div>

            <hr className="border-gray-300 my-2" />

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
                className="bg-green-500 ml-8 px-3 py-1 text-xs rounded text-white "
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
        className="w-full text-justify leading-none text-xs"
      >
        {newText}
      </p>
    </div>
  );
};
