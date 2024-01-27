import React, { useEffect, useState } from "react";
import List from "../Components/List";
import { BE_getTaskList, getStorageUser } from "../Backend/Queries";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { ListLoaders } from "../Components/Loaders";
import FlipMove from "react-flip-move";

type Props = {};

function ListPage({}: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const taskList = useSelector(
    (state: RootState) => state.taskList.currentTaskList
  );
  const currentUser = getStorageUser();

  useEffect(() => {
    if (currentUser) {
      BE_getTaskList(dispatch, setLoading);
    }
  }, []);

  return (
    <div className="p-10">
      {loading ? (
        <div className="flex flex-wrap justify-center gap-20">
          <ListLoaders />
        </div>
      ) : taskList && taskList.length === 0 ? (
        <h1 className="text-3xl text-center text-gray-500 mt-10">
          No task list added
        </h1>
      ) : (
        <FlipMove className="flex flex-wrap justify-center gap-10">
          {taskList && taskList.map((t) => <List key={t.id} list={t} />)}
        </FlipMove>
      )}
    </div>
  );
}

export default ListPage;
