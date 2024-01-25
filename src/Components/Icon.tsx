import React from "react";
import { IconType } from "react-icons";
import Spinner from "./Spinner";

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
      className={`relative p-3 rounded-full cursor-pointer hover:bg-myBlue ${
        reduceOpacityOnHover
          ? "hover:bg-opacity-30"
          : "bg-myBlue text-white border 2 hover:drop-shadow-lg"
      } ${loading && "cursor-wait"} ${className}`}
    >
      {loading ? <Spinner /> : <Name size={size} />}
      {ping && (
        <>
          <span className="animate-ping absolute -top-1 left-7 w-3 h-3 rounded-full bg-green-400 opacity-75"></span>
          <span className="absolute -top-1 left-7 w-3 h-3 rounded-full bg-green-500"></span>
        </>
      )}
    </button>
  );
}

export default Icon;
