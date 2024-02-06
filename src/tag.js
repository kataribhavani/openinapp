import { useState, useMemo } from "react";

export default function Tag({ rowData }) {
  const [tags, setTags] = useState([]);
  
  const tagOptions = useMemo(
    () => rowData["select tags"]?.split(", "),
    [rowData]
  );
  const handleSelectTags = (evt) => {
    evt.stopPropagation();
    setTags((currTags) => [...currTags, evt.target.value]);
  };

  const handleRemoveTags = (tag) => {
    setTags((currTags) => currTags?.filter((t) => t !== tag));
  };
  return (
    <tr className="bg-white h-10">
      <td className="flex justify-center items-center">{rowData.id}</td>
      <td>{rowData.links}</td>
      <td>{rowData.prefix}</td>
      <td className="flex justify-center items-center">
        <select value="" onChange={handleSelectTags}>
          <option>--select--</option>
          {tagOptions
            ?.filter((t) => !tags?.find((tag) => tag === t))
            ?.map((select) => (
              <option key={select} value={select}>
                {select}
              </option>
            ))}
        </select>
      </td>
      <td>
        {tags?.map((tag) => (
          <span
            key={tag}
            className="h-4 w-6 text-white m-1 bg-blue-400 p-0.5 rounded"
          >
            {tag}
            &nbsp;{" "}
            <span
              className="cursor-pointer"
              onClick={() => handleRemoveTags(tag)}
            >
              &times;
            </span>
          </span>
        ))}
      </td>
    </tr>
  );
}
