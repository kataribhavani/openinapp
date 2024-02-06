import React from "react";
import bell from "./bell.svg";

export default function Header() {
  const data = [
    {
      icon: "",
      title: "Base",
      path: "",
    },
    {
      icon: "",
      title: "Upload CSV",
      path: "./upload",
    },
    {
      icon: "bell",
      title: "",
      path: "",
    },
    {
      icon: "user",
      title: "",
      path: "",
    },
  ];
  return (
    <div className="h-20 w-full m-2">
      <div className="grid grid-cols-2">
        <span className="grid grid-cols-4">
          {data?.map((d, idx) => (
            <span className="font-semibold" key={idx}>{d?.title}</span>
          ))}
        </span>
        <span className="flex justify-end items-end mr-6">
          <img src={bell} alt="bell" />
        </span>
      </div>
    </div>
  );
}
