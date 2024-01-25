import React, { useState } from "react";
import Button from "./Button";
import Icons from "./Icon";
import Icon from "./Icon";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { BE_addTaskList } from "../Backend/Queries";

type Props = {};

function AddListBoard({}: Props) {
  const [addLoading, setAddLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTaskList = () => {
    BE_addTaskList(dispatch, setAddLoading);
  };
  return (
    <>
      <Button
        text="Add new ListBoard"
        onClick={handleAddTaskList}
        secondary
        className="hidden md:flex"
        loading={addLoading}
      />
      <Icon
        Name={MdAdd}
        className="block md:hidden"
        loading={addLoading}
      ></Icon>
    </>
  );
}

export default AddListBoard;
