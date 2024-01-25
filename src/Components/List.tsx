import React from "react";
import Icon from "./Icon";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";

type Props = {};

function List({}: Props) {
  return (
    <div className="relative">
      <div className="bg-white w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between md:gap-10 bg-gradient-to-r from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
          <p>Tasklist Text Here</p>
          <div>
            <Icon Name={MdEdit} reduceOpacityOnHover />
            <Icon Name={MdDelete} reduceOpacityOnHover />
            <Icon Name={MdKeyboardArrowDown} reduceOpacityOnHover />
          </div>
        </div>
      </div>
      <Icon
        Name={MdAdd}
        className="absolute -mt-6 -ml-4 p-2 drop-shadow-lg hover:bg-myPink"
      />
    </div>
  );
}

export default List;
