import React, { useEffect, useState } from "react";
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
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showModal]);

  console.log({ fileUrl, text });

  if (!fileUrl || !text) {
    navigate("/", { replace: true });
  }

  const newText = trimText(text);

  return (
    <div className="relative flex h-screen w-full bg-[#111111] overflow-hidden">
      {showModal && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md px-8 py-6 text-black">
            <p>Would appreciate the star on github :)</p>
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
