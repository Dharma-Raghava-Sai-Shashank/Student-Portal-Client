import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";

const data = [
  "Google, India SDE",
  "Microsoft, India SoftWare Development",
  "FutureFirst, Kolkata",
  "Sprinkler Business Analyst",
];

export const Extras = () => {
  return (
    <div className="grey3b border">
      <div className=" ms-1 px-2 pt-3 ms-3">
        <Typography variant="h6">
          <b>Extras</b>
        </Typography>
      </div>
      <div className=" py-3 ms-1 px-2">
        <div className=" mx-2 p-3  bg-white">
          <Typography variant="button" display="block" gutterBottom>
            <strong>Upcoming Deadlines</strong>
          </Typography>
          {data.map((item: any) => (
            <Link
              to={`/student/jobProfile/${"12n2nw2"}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <List>
                <ListItem sx={{ p: 0 }}>
                  <span className="me-2 text-danger">&#9658;</span>
                  {item}
                </ListItem>
              </List>
            </Link>
          ))}
        </div>
      </div>
      <div className=" py-3 ms-1 px-2 my-2">
        <div className=" mx-2 p-3  bg-white">
          <Typography variant="button" display="block" gutterBottom>
            <strong>Your Shortlist</strong>
          </Typography>
          {data.map((item: any) => (
            <Link
              to={`/student/jobProfile/${"12n2nw2"}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <List>
                <ListItem sx={{ p: 0 }}>
                  <span className="me-2 text-success">&#9658;</span>
                  {item}
                </ListItem>
              </List>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
