import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { htmlTypography } from "./Dashboard";
import { HtmlText } from "../../Admin/Placement/ShowJob";
import "./style.scss";

interface props {
  company: string;
}

export default function EachNotice({ company }: props) {
  return (
    <div className="d-flex justify-content-center my-5">
      <Card sx={{ width: "90%", maxHeight: "500px", overflowY: "auto" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#00ae57" }} aria-label="recipe">
              R
            </Avatar>
          }
          title={
            <Typography
              className="title-responsive"
              variant="body2"
              sx={{ fontSize: "1.15rem", mt: 2 }}
            >
              Open for application: <span>{company}</span>
            </Typography>
          }
          subheader={
            <div className="row me-1 subHeader-responsive">
              <div className="col-md-3 col-12">Prof. Debjani Maam</div>
              <div className="col-md-3 col-12">September 14, 2016</div>
            </div>
          }
        />

        <CardContent>{htmlTypography(HtmlText)}</CardContent>
        <CardContent>{htmlTypography(HtmlText)}</CardContent>
        <CardContent>{htmlTypography(HtmlText)}</CardContent>
      </Card>
    </div>
  );
}
