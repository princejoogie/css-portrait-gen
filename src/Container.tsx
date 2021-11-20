import React from "react";

export const Container: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className, ...rest }) => {
  return (
    <div className={`container px-4 mx-auto ${className}`} {...rest}>
      {children}
    </div>
  );
};
