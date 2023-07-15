import React, { useState, ChangeEvent } from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";

const users = [
  { name: 'Deveshi Singh', admissionNumber: '21je0304' },
  { name: 'Deepika', admissionNumber: '21je0900' },
  { name: 'Tanya', admissionNumber: '20je0294' },
  { name: 'Harsh', admissionNumber: '19je0404' },
  { name: 'Abc', admissionNumber: '19je0404' }
];

export const Users = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm ">
          <br></br>
          <h4>Search for users</h4>
          <br></br>
          <div className="search-box">
          <Autocomplete
              options={users}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <br></br>
          </div>
          {users.map((user, index) => (
            <Card key={index} >
              <CardContent style={{ height: '100px' }}>
                <Grid container spacing={2} alignItems="center" >
                  <Grid item>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={1}>
                      <Grid item xs>
                        <Typography variant="h6">{user.name}</Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body1" color="textSecondary">
                          Admission Number: {user.admissionNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="col-sm "></div>
        <div className="col-sm "></div>
      </div>
    </div>
  );
}

