import React, { useState } from "react";
import { MainSidebar } from "../Sidebars/MainSidebar";
import { Header1 } from "../Headers/Header1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EachNotice from "../../Student/Dashboard/EachNotice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNoticeForCycles } from "../../Slices/notice";

export const Notices = () => {
  const dispatch = useAppDispatch();

  const notices = useAppSelector((state) => state.notice);

  React.useEffect(() => {
    dispatch(getNoticeForCycles([4]));
  }, [dispatch]);
  const modules = {
    toolbar: [
      [{ header: [false] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };

  const [newnotices, setNewnotices] = useState("");
  return (
    <div>
      <div>
        <div className="d-flex">
          <MainSidebar />
          <div className="w-100">
            <Header1 />
            <div className=" w-100 px-5 py-5 grey2b">
              <div>
                <span className="fs-14">Companies | </span>

                <span className={`fs-14  green1c fw-500`}>Notices</span>
              </div>
              <div className="bg-white my-2 shadow-lg ">
                <div className="my-3">
                  <label htmlFor="Company Name" className="newjobLabel ms-2">
                    Add Additional Details
                  </label>

                  <div>
                    <ReactQuill
                      theme="snow"
                      value={newnotices}
                      //   onChange={(e) => setNewnotices(()=>e.target.value)}
                      modules={modules}
                      style={{ height: "300px", marginBottom: "150px" }}
                    />
                  </div>
                  <div className="row w-100 m-0">
                    <div
                      className="border-right"
                      style={{ backgroundColor: "#dddddd64" }}
                    >
                      {notices?.map((item: Notice.RootObject) => (
                        <EachNotice notice={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
