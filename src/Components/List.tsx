import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import Tasks from "./Tasks";
import { taskListType } from "../Types";

type Props = {
  list: taskListType;
};

const List = forwardRef(
  ({ list }: Props, ref: React.LegacyRef<HTMLDivElement> | undefined) => {
    const { id, title, editMode, tasks } = list;
    const [homeTitle, setHomeTitle] = useState(title);

    return (
      <div ref={ref} className="relative">
        <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between md:gap-10 bg-gradient-to-r from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            {editMode ? (
              <input
                value={homeTitle}
                onChange={(e) => setHomeTitle(e.target.value)}
                className="flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-[1px] border-white rounded-md"
                placeholder="Enter Task list title"
              ></input>
            ) : (
              <p>{title}</p>
            )}
            <div>
              <Icon Name={editMode ? MdSave : MdEdit} reduceOpacityOnHover />
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
