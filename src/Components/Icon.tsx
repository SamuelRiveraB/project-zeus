import React from "react";
import { IconType } from "react-icons";

type Props = {
  Name: IconType;
  size?: number;
  className?: string;
  loading?: boolean;
  reduceOpacityOnHover?: boolean;
  ping?: boolean;
  onClick?: () => void;
};

function Icon({
  Name,
  size = 20,
  className,
  loading,
  ping,
  reduceOpacityOnHover,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`p-3 rounded-full cursor-pointer hover:bg-myBlue ${
        reduceOpacityOnHover
          ? "hover:bg-opacity-30"
          : "bg-myBlue text-white border 2 hover:drop-shadow-lg"
      } ${loading && "cursor-wait"} ${className}`}
    >
      {loading ? "Loading" : <Name size={size} />}
    </button>
  );
}

export default Icon;
