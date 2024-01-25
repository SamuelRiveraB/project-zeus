import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { taskType } from "../Types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { collapseTask, taskSwitchEditMode } from "../Redux/taskListSlice";
import { BE_saveTask } from "../Backend/Queries";

type Props = {
  task: taskType;
  listId: string;
};

const Task = forwardRef(
  ({ task, listId }: Props, ref: React.LegacyRef<HTMLDivElement>) => {
    const { id, title, description, editMode, collapsed } = task;
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDesc, setTaskDesc] = useState(description);
    const [saveloading, setSaveLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = () => {
      const taskData: taskType = {
        id,
        title: taskTitle,
        description: taskDesc,
      };
      BE_saveTask(listId, dispatch, setSaveLoading, taskData);
    };

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
            <p
              onClick={() => dispatch(collapseTask({ listId, id }))}
              className="cursor-pointer"
            >
              {title}
            </p>
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
                <Icon
                  onClick={() =>
                    editMode
                      ? handleSave()
                      : dispatch(taskSwitchEditMode({ listId, id }))
                  }
                  Name={editMode ? MdSave : MdEdit}
                  loading={saveloading}
                  reduceOpacityOnHover
                />
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
