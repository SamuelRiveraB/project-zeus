import React, { forwardRef } from "react";
import Icon from "./Icon";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import Tasks from "./Tasks";
import { taskListType } from "../Types";

type Props = {
  list: taskListType;
};

const List = forwardRef(
  ({ list }: Props, ref: React.LegacyRef<HTMLDivElement> | undefined) => {
    const { id, title, editMode, tasks } = list;
    return (
      <div ref={ref} className="relative">
        <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between md:gap-10 bg-gradient-to-r from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            <p>{title}</p>
            <div>
              <Icon Name={MdEdit} reduceOpacityOnHover />
              <Icon Name={MdDelete} reduceOpacityOnHover />
              <Icon Name={MdKeyboardArrowDown} reduceOpacityOnHover />
            </div>
          </div>
          <Tasks />
        </div>
        <Icon
          Name={MdAdd}
          className="absolute -mt-6 -ml-4 p-3 drop-shadow-lg hover:bg-myPink"
        />
      </div>
    );
  }
);

export default List;
