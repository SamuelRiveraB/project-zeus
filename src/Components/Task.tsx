import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit } from "react-icons/md";
import { taskType } from "../Types";

type Props = {
  task: taskType;
  listId: string;
};

const Task = forwardRef(
  ({ task, listId }: Props, ref: React.LegacyRef<HTMLDivElement>) => {
    const { id, title, description, editMode, collapsed } = task;
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDesc, setTaskDesc] = useState(description);
    return (
      <div
        ref={ref}
        className="p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md bg-white"
      >
        <div>
          {editMode ? (
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border-2 px-2 border-myBlue rounded-sm mb-1"
              placeholder="Task title"
            ></input>
          ) : (
            <p className="cursor-pointer">Task title here</p>
          )}
        </div>
        {!collapsed && (
          <div>
            <hr />
            <div>
              {editMode ? (
                <textarea
                  onChange={(e) => setTaskDesc(e.target.value)}
                  value={taskDesc}
                  placeholder="Todo description"
                  className="w-full px-3 border-2 border-myBlue rounded-md mt-2"
                />
              ) : (
                <p className="p-2 text-justify">{description}</p>
              )}
              <div className="flex justify-end">
                <Icon Name={MdEdit} reduceOpacityOnHover />
                <Icon Name={MdDelete} reduceOpacityOnHover />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Task;
