import React, { useEffect, useState } from "react";
import List from "../Components/List";
import { BE_getTaskList } from "../Backend/Queries";
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

  useEffect(() => {
    BE_getTaskList(dispatch, setLoading);
  }, []);

  return (
    <div className="p-10">
      {loading ? (
        <div className="flex flex-wrap justify-center gap-20">
          <ListLoaders />
        </div>
      ) : (
        <FlipMove className="flex flex-wrap justify-center gap-10">
          {taskList.map((t) => (
            <List key={t.id} list={t} />
          ))}
        </FlipMove>
      )}
    </div>
  );
}

export default ListPage;
