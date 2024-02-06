import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import excel from "./excel.svg";
import Menu from "./menu";
import Header from "./header";
import uploadIcon from "./upload.svg";
import Tag from "./tag";

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const [selected, setSelected] = useState("Upload");
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-3">
        <div>
          <Menu selected={selected} setSelected={setSelected} />
        </div>
        <div className="col-span-2 mt-16 ml-8">
          <div className="container">
            <div
              className="rectangle"
              onDragEnter={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer?.files[0];
                console.log(file.type);
                if (
                  !fileDetails &&
                  (file?.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                    file?.type === "text/csv")
                ) {
                  setFileDetails(file);
                  setShowTable(false);
                }
              }}
            >
              <div className="p-10">
                <span className="flex justify-center items-center">
                  <img src={excel} alt="excel" />
                </span>
                {fileDetails && (
                  <span className="flex flex-col space-y-2 justify-center items-center">
                    <span>{fileDetails?.name}</span>
                    <span
                      onClick={() => setFileDetails(null)}
                      className="text-red-600 text-sm cursor-pointer"
                    >
                      Remove
                    </span>
                  </span>
                )}
              </div>
              <div>
                {isDragging
                  ? <span className="flex justify-center items-center">Drop here</span>
                  : !fileDetails && (
                      <span className="flex justify-center items-center">
                        Drop your excel here or{" "}
                        <span
                          onClick={() => hiddenFileInput?.current?.click()}
                          className="cursor-pointer text-blue-400 ml-2"
                        >
                          browse
                          <input
                            type="file"
                            accept=".xlsx,.csv"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setFileDetails(file);
                            }}
                            ref={hiddenFileInput}
                            style={{ display: "none" }} // Make the file input element invisible
                          />
                        </span>
                      </span>
                    )}
              </div>
              <span className="flex flex-col justify-center items-center mt-2">
                <button
                  type="button"
                  disabled={!fileDetails || loading}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (fileDetails) {
                      setLoading(true);
                      const data = await fileDetails?.arrayBuffer();
                      const workbook = XLSX.read(data);
                      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 0,
                      });
                      setData(jsonData);
                      setFileDetails(null);
                      setShowTable(true);
                      setIsDragging(false);
                      setLoading(false);
                    }
                  }}
                  className={!fileDetails ? "disable" : "submitbutton"}
                >
                  <span className="flex space-x-2 justify-center items-center">
                    <img src={uploadIcon} alt="uploadIcon" />
                    <span className="text-white">
                      {loading ? "Uploading..." : "Upload"}
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
          {showTable && (
            <div className="space-y-4">
              <span className="text-2xl font-semibold">Uploads</span>
              <div className="bg-slate-100">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-lg font-semibold">SI.No</th>
                      <th className="text-lg font-semibold">Links</th>
                      <th className="text-lg font-semibold">Prefix</th>
                      <th className="text-lg font-semibold">Add Tags</th>
                      <th className="text-lg font-semibold">Selected Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((val, idx) => {
                      return <Tag key={idx} rowData={val} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
