import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

import { defaultText, ShareableData, trimText } from "../utils/helpers";
import { db } from "../utils/database";

const fillAndCenter =
  "h-screen w-full flex items-center justify-center flex-col";

export const Share: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<ShareableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (id) {
        const docRef = doc(db, "uploads", id);
        const docSnap = await getDoc(docRef);
        const exists = !!docSnap.exists();

        if (exists) {
          setData(docSnap.data() as ShareableData);
        } else {
          setError("Document does not exist");
        }
      } else {
        setError("No id provided");
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) {
    return <div className={fillAndCenter}>Loading...</div>;
  }

  if (error) {
    return <div className={`${fillAndCenter} text-red-500`}>{error}</div>;
  }

  if (!data) {
    return <div className={`${fillAndCenter}`}>No data.</div>;
  }

  const { options, fileUrl, text } = data;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <p
        style={{
          backgroundImage: `url(${fileUrl})`,
          fontSize: options.fontSize,
          letterSpacing: options.letterSpacing,
          lineHeight: `${options.lineHeight}px`,
          backgroundSize: options.backgroundSize,
        }}
        className="absolute inset-0 text-justify text-transparent bg-scroll bg-center bg-no-repeat bg-clip-text"
      >
        {trimText(!!text ? text : defaultText, options)}
      </p>
    </div>
  );
};
