import Typography from "@mui/material/Typography";
import { HeaderStudent } from "../Headers/HeaderStudent";
import { StudentSidebar } from "../Sidebars/StudentSidebar";
import EachNotice from "./EachNotice";
import { Extras } from "./Extras";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React from "react";
import { getNoticeForCycles } from "../../Slices/notice";
import {Navigate, useNavigate} from "react-router-dom";

export const htmlTypography = (html: JSX.Element) => {
  return (
    <Typography paragraph sx={{ fontSize: "1rem" }}>
      {html}
    </Typography>
  );
};

const is_registered = true;

export default function DashBoard() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notices = useAppSelector((state) => state.notice);

  React.useEffect(() => {
    dispatch(getNoticeForCycles([4]));
  }, [dispatch]);

  if(!is_registered) {
    navigate("/reg");
  }

  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <div className="row w-100 m-0">
          <div
            className="col-md-9 col-12 border-right"
            style={{ backgroundColor: "#dddddd64" }}
          >
            {notices?.map((item: Notice.RootObject) => (
              <EachNotice notice={item} />
            ))}
          </div>
          <div className="displayNone col-md-3 col-12 px-1 py-0 extrasticky">
            <Extras />
          </div>
        </div>
      </div>
    </div>
  );
}
