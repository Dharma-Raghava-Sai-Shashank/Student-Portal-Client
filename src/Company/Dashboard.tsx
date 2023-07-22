import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CompanyHeader from "./CompanyHeader";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const data = [
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd June, 2022",
    profile: "Business Analayst",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd November, 2022",
    profile: "Software Eng",
    status: "Edit",
  },
  {
    id: 1,
    cycle: "June-July 2 Month 2024 batch",
    date: "12nd August, 2022",
    profile: "Software Develoer",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd June, 2022",
    profile: "Business Analayst",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd November, 2022",
    profile: "Software Eng",
    status: "Edit",
  },
  {
    id: 1,
    cycle: "June-July 2 Month 2024 batch",
    date: "12nd August, 2022",
    profile: "Software Develoer",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd June, 2022",
    profile: "Business Analayst",
    status: "Submitted",
  },
  {
    id: 1,
    cycle: "Jan-July 6 Month",
    date: "22nd November, 2022",
    profile: "Software Eng",
    status: "Edit",
  },
  {
    id: 1,
    cycle: "June-July 2 Month 2024 batch",
    date: "12nd August, 2022",
    profile: "Software Develoer",
    status: "Submitted",
  },
];

export const Dashboard = () => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#d1e2d245",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <div>
      <CompanyHeader />
      <div className="p-5 grey2b mh-100" style={{ marginTop: "5rem" }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Dashboard</Typography>
          </Breadcrumbs>
        </div>
        <div className="my-1">
          <div className=" p-5 bg-white">
            <div className="d-flex justify-content-center my-3">
              <Button
                variant="outlined"
                color="success"
                className="bg-white"
                sx={{ fontSize: "1.1rem", px: 5, py: 2, my: 5, zIndex: "0" }}
                startIcon={<AddIcon />}
              >
                Fill a new form
              </Button>
            </div>
            <div className="d-flex justify-content-center my-5 mx-3 px-3">
              <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                  <Table aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={6}>
                          <FormControl sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput
                              id="outlined-adornment-weight"
                              endAdornment={
                                <InputAdornment position="end">
                                  <SearchIcon />
                                </InputAdornment>
                              }
                              fullWidth
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell key="cycle">Cycle</TableCell>
                        <TableCell key="profile">Profile</TableCell>
                        <TableCell key="Date">Date</TableCell>
                        <TableCell key="Status">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((nf) => {
                          return (
                            <StyledTableRow key={nf.id}>
                              <TableCell>{nf.cycle}</TableCell>
                              <TableCell>{nf.profile}</TableCell>
                              <TableCell>{nf.date}</TableCell>
                              <TableCell>{nf.status}</TableCell>
                            </StyledTableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
