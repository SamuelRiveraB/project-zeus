import React from "react";
import Button from "./Button";

type Props = {};

function Alert({}: Props) {
  return (
    <div className={`fixed top-0 z-50 h-full w-full block`}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white border-8 min-w-[500px] rounded-[30px] z-30 p-10 flex flex-col">
          <div className="flex-1 mb-5">
            <p>{`Start chatting with user?`}</p>
          </div>
          <div className="flex justify-end gap-5">
            <Button text="Cancel" secondary />
            <Button text="Sure" />
          </div>
        </div>
        <div className="bg-black backdrop-blur-[2px] bg-opacity-30 h-full w-full absolute z-20"></div>
      </div>
    </div>
  );
}

export default Alert;
