import React from "react";
import { useParams } from "react-router-dom";

export const Share: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      {/* <pre>{JSON.stringify(params, null, 2)}</pre> */}
      <p>id: {id}</p>
    </div>
  );
};
