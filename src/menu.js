import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({
    selected, setSelected
}){
    const history = useNavigate();
    const data = [
        {
            icon: "",
            title: "Dashboard",
            path: ""
        },
        {
            icon: "",
            title: "Upload",
            path: "./"
        },
        {
            icon: "",
            title: "Invoice",
            path: ""
        },
        {
            icon: "",
            title: "Schedule",
            path: ""
        },
        {
            icon: "",
            title: "Calendar",
            path: ""
        },
        {
            icon: "",
            title: "Notification",
            path: ""
        },
        {
            icon: "",
            title: "Settings",
            path: ""
        }
    ]
    return (
        <div className="menu">{data?.map((d, idx)=><span key={idx}><div onClick={()=>{setSelected(d?.title); history(d?.path);}} className={`flex h-16 justify-start items-center cursor-pointer ${d?.title===selected ? "text-blue-400":""}`}>{d?.title}</div></span>)}</div>
    )
}