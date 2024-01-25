import React from "react";
import List from "../Components/List";

type Props = {};

function ListPage({}: Props) {
  return (
    <div className="p-10">
      <div className="flex flex-wrap justify-center gap-10">
        <List />
        <List />
        <List />
        <List />
      </div>
    </div>
  );
}

export default ListPage;
