import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import "./style.scss";
import moment from "moment";

interface props {
  notice: Notice.RootObject;
}

export const convertStringToHTML = (htmlString: string) => {
  return parse(htmlString);
};
export const NoticeCardStyle = {
  width: "90%",
  maxHeight: "500px",
  overflowY: "auto",
  boxShadow: "rgb(237, 237, 237) 0px 10px 15px 0px",
  borderRadius: "10px",
};

export default function EachNotice({ notice }: props) {
  return (
    <div className="d-flex justify-content-center my-3 ">
      <Card sx={NoticeCardStyle}>
        <CardHeader
          sx={{ px: 3 }}
          avatar={<Avatar sx={{ mt: 1, backgroundColor: "#1976d2" }}></Avatar>}
          title={
            <Typography
              className="title-responsive fw-500"
              variant="body2"
              sx={{ fontSize: "1.15rem", mt: 2 }}
            >
              {notice?.title}
            </Typography>
          }
          subheader={
            <div className=" me-1 subHeader-responsive">
              <div className="">
                Prof. Debjani Maam
                {notice.updatedAt !== notice.createdAt && (
                  <p>&#x2022; ( Edited )</p>
                )}
              </div>
              <div className="">
                Posted on:{"  "}
                {moment(notice?.updatedAt).format(`Do MMMM, YYYY    hh:mm a`)}
                {"  ( " +
                  moment(notice?.updatedAt).startOf("hour").fromNow() +
                  " )"}
              </div>
            </div>
          }
        />
        <CardContent className="mx-3">
          <div>{convertStringToHTML(notice.description)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
