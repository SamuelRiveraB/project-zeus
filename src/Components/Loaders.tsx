import React from "react";

type Props = {};

export function ListLoaders({}: Props) {
  return (
    <div className="w-full flex flex-wrap gap-10 justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => (
        <ListLoader key={l} />
      ))}
    </div>
  );
}

function ListLoader() {
  return (
    <div className="relative bg-gray-200 shadow rounded-md max-w-sm w-full">
      <div className="animate-pulse flex flex-col">
        <div className="h-14 bg-gray-300 rounded-t-md"></div>
        <div className="flex-1 space-y-3 p-10"></div>
      </div>
      <div className="absolute rounded-full animate-pulse -b-4 -l-4 bg-gray-300 h-10 w-10"></div>
    </div>
  );
}

export const TaskLoader = () => {
  return (
    <div className="animate-pulse flex-1 space-y-3 p-4 pb-10">
      <div className="h-2 bg-gray-300 rounded-md"></div>
      <div className="h-2 bg-gray-300 rounded-md"></div>
      <div className="h-2 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export const UsersLoader = () => {
  return (
    <div className="flex flex-col">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
        <UserLoader key={s} />
      ))}
    </div>
  );
};

export const UserLoader = () => {
  return (
    <div className="animate-pulse flex gap-2 items-center px-5 py-3 border-b-[1px] border-gray-200">
      <div className="w-11 h-11 rounded-full bg-gray-300"></div>
      <div className="flex flex-col gap-2 w-[80%] lg:w-[90%]">
        <div className="bg-gray-300 h-3 rounded-md"></div>
        <div className="bg-gray-300 h-3 rounded-md"></div>
      </div>
    </div>
  );
};
