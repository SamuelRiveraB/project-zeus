import { text } from "body-parser";
import React from "react";

type InputProps = {
  name: string;
  value?: string;
  type?: string;
  onChange?: (e: any) => void;
  className?: string;
  onKeyDown?: (e: any) => void;
  disabled?: boolean;
};

const Input = ({
  name,
  value,
  type = "text",
  onChange,
  className,
  onKeyDown,
  disabled,
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      placeholder={`Enter ${name}`}
      disabled={disabled}
      className={`flex-1 placeholder-gray-200 bg-transparent px-3 py-1 border-2 border-gray-200 rounded-full ${className}`}
    />
  );
};

export default Input;
