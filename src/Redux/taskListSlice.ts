import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";

export const defaultTaskList: taskListType = {
  title: "Sample Task List",
};

export const defaultTask: taskType = {
  title: "Do the dishes",
  description: "I need to do it pronto",
};

type taskListSliceType = {
  currentTaskList: taskListType[];
};

const initialState: taskListSliceType = {
  currentTaskList: [],
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.currentTaskList = action.payload;
    },
    addTaskList: (state, action) => {
      const newTaskList = action.payload;
      newTaskList.editMode = true;
      newTaskList.tasks = [];
      state.currentTaskList.unshift(newTaskList);
    },
    saveTaskListTitle: (state, action) => {
      const { id, title } = action.payload;
      state.currentTaskList = state.currentTaskList.map((t) => {
        if (t.id === id) {
          t.title = title;
          t.editMode = false;
        }
        return t;
      });
    },
    taskListSwitchEditMode: (state, action) => {
      const { id, value } = action.payload;
      state.currentTaskList = state.currentTaskList.map((t) => {
        if (t.id === id) {
          t.editMode = value !== undefined ? value : true;
        }
        return t;
      });
    },
    deleteTaskList: (state, action) => {
      const listId = action.payload;
      state.currentTaskList = state.currentTaskList.filter(
        (t) => t.id !== listId
      );
    },
    addTask: (state, action) => {
      const { listId, newTask } = action.payload;
      state.currentTaskList = state.currentTaskList.map((t) => {
        if (t.id === listId) {
          t.editMode = false;
          const tasks = t.tasks?.map((t) => {
            t.editMode = false;
            t.collapsed = true;
            return t;
          });
          tasks?.push({ ...newTask, editMode: true, collapsed: false });
          t.tasks = tasks;
        }
        return t;
      });
    },
  },
});

export const {
  setTaskList,
  addTaskList,
  saveTaskListTitle,
  taskListSwitchEditMode,
  deleteTaskList,
  addTask,
} = taskListSlice.actions;
export default taskListSlice.reducer;
