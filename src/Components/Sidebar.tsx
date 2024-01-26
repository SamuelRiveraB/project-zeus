import React from "react";

type Props = {
  children?: JSX.Element;
  isRight?: boolean;
  className?: string;
};

function Sidebar({ children, isRight, className }: Props) {
  return (
    <div
      className={`bg-white shadow-md border-2 overflow-scroll ${
        isRight
          ? "rounded-tr-3xl rounded-br-3xl"
          : "rounded-tl-3xl rounded-bl-3xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Sidebar;
