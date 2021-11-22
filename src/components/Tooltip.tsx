import React from "react";

export interface TooltipProps {
  className?: string;
  text: string;
  xPos: number;
  yPos: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  className,
  text,
  xPos,
  yPos,
}) => {
  return (
    <div
      className={`fixed ${className}`}
      style={{
        top: yPos,
        left: xPos,
      }}
    >
      <p>{text}</p>
    </div>
  );
};
