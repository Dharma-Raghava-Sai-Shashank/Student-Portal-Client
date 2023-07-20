import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@mui/material";
import { Card, CardContent, Typography, Avatar, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const users = [
  { name: 'Deveshi Singh', admissionNumber: '21je0304', lastName: 'xyz', email: '21je0304@iitism.ac.in', company: 'None' },
  { name: 'Deepika', admissionNumber: '21je0900', lastName: 'Abc', email: 'xyz@gmail.com', company: 'TCS' }
];

export const Users = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
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
              <CardContent style={{ height: '75px'}}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={1}>
                      <Grid item xs>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>{user.name}</Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{ fontSize: 14 }} variant="body1" color="textSecondary">
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
        <div className="col-8">
          <div className="roles-section">
            <br></br>
            <Typography variant="h6">Roles: </Typography>
            <br></br>
            <Grid container spacing={3}>
              <Grid item>
                <Button variant="contained" color="info">
                  Admin
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="info">
                  Agent
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="info">
                  Customer
                </Button>
              </Grid>
            </Grid>
          </div>
          <br></br>
          <div className="table-container">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{ background: '#f0f0f0' }}>
                    <TableCell>Email</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Company</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.company}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
