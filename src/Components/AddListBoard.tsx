import React from "react";
import Button from "./Button";
import Icons from "./Icon";
import Icon from "./Icon";
import { MdAdd } from "react-icons/md";

type Props = {};

function AddListBoard({}: Props) {
  return (
    <>
      <Button text="Add new ListBoard" secondary className="hidden md:flex" />
      <Icon Name={MdAdd} className="block md:hidden"></Icon>
    </>
  );
}

export default AddListBoard;
