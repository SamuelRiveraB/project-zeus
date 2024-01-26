import React, { forwardRef, useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import {
  BE_addTask,
  BE_deleteTaskList,
  getAllTasks,
  BE_saveTaskList,
} from "../Backend/Queries";
import { collapseAll, taskListSwitchEditMode } from "../Redux/taskListSlice";
import { TaskLoader } from "./Loaders";

type Props = {
  list: taskListType;
};

const List = forwardRef(
  ({ list }: Props, ref: React.LegacyRef<HTMLDivElement> | undefined) => {
    const { id, title, editMode, tasks = [] } = list;
    const [homeTitle, setHomeTitle] = useState(title);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [getLoading, setGetLoading] = useState(false);
    const [allCollapsed, setAllCollapsed] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      if (id) getAllTasks(id, dispatch, setGetLoading);
    }, []);

    useEffect(() => {
      const checkAllCollapsed = () => {
        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];
          if (!task.collapsed) return setAllCollapsed(false);
        }
        return setAllCollapsed(true);
      };
      checkAllCollapsed();
    }, [tasks]);

    const handleSave = () => {
      if (id) BE_saveTaskList(dispatch, setSaveLoading, id, homeTitle);
    };

    const checkEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave();
      }
    };

    const handleDelete = () => {
      if (id && tasks) BE_deleteTaskList(dispatch, setDeleteLoading, id, tasks);
    };

    const handleAddTask = () => {
      if (id) BE_addTask(id, dispatch, setAddLoading);
    };

    const handleCollapseClick = () => {
      if (allCollapsed) {
        return dispatch(collapseAll({ listId: id, value: false }));
      }
      return dispatch(collapseAll({ listId: id }));
    };

    return (
      <div ref={ref} className="relative">
        <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between md:gap-10 bg-gradient-to-r from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            {editMode ? (
              <input
                value={homeTitle}
                onKeyDown={checkEnterKey}
                onChange={(e) => setHomeTitle(e.target.value)}
                className="flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-[1px] border-white rounded-md"
                placeholder="Enter Task list title"
              ></input>
            ) : (
              <p>{title}</p>
            )}
            <div>
              <Icon
                Name={editMode ? MdSave : MdEdit}
                onClick={() =>
                  editMode
                    ? handleSave()
                    : dispatch(taskListSwitchEditMode({ id }))
                }
                reduceOpacityOnHover
                loading={editMode && saveLoading}
              />
              <Icon
                onClick={handleDelete}
                Name={MdDelete}
                loading={deleteLoading}
                reduceOpacityOnHover
              />
              <Icon
                onClick={handleCollapseClick}
                Name={MdKeyboardArrowDown}
                className={`${allCollapsed ? "rotate-180" : "rotate-0"}`}
                reduceOpacityOnHover
              />
            </div>
          </div>
          {getLoading ? (
            <TaskLoader />
          ) : (
            <Tasks tasks={tasks || []} listId={id || ""} />
          )}
        </div>
        <Icon
          onClick={handleAddTask}
          Name={MdAdd}
          className="absolute -mt-6 -ml-4 p-3 drop-shadow-lg"
          loading={addLoading}
        />
      </div>
    );
  }
);

export default List;
