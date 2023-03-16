import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import * as XLSX from "xlsx";
import { DeleteOutlined, Edit, Send } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const btnStyle = {
  marginLeft: "10px",
};

interface StudentData {
  admno: string;
  first_name: string;
  last_name: string;
  instiMailId: string;
}

export const CSVUploader: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState<StudentData[]>([]);
  const [isEditable, setIsEditable] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let Sdata: StudentData[] = [];

  const renderField = (value: string) => {
    return (
<>
          {isEditable ? (
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
              value={value}
              fullWidth
            />
          ) : (
            <span style={{ overflow: "hidden", textOverflow: "clip" }}>
              {value}
            </span>
          )}
        </>
    )
  }

  const columns: GridColDef[] = [
    {
      field: "admno",
      headerName: "Admission No.",
      width: 150,
      renderCell: ({ value }) => renderField(value),
    },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
      renderCell: ({ value }) => renderField(value),
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
      renderCell: ({ value }) => renderField(value),
    },
    {
      field: "instiMailId",
      headerName: "Email",
      type: "string",
      width: 400,
      renderCell: ({ value }) => renderField(value),
    },
  ];

  const handleUpload = (e: any) => {
    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e: any) {
      var data = e?.target?.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // convert into array of objects
      dataParse.shift();

      for (let i in dataParse) {
        Sdata.push({
          admno: dataParse[i][0],
          first_name: dataParse[i][1],
          last_name: dataParse[i][2],
          instiMailId: dataParse[i][3],
        });
      }
      setRows(Sdata);
    };
    reader.readAsBinaryString(f);
    handleOpen();
  };

  return (
    <>
      <div className="py-3 px-2 d-flex justify-content-between">
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            accept="text/csv"
            multiple
            onChange={handleUpload}
            type="file"
          />
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              margin: "10px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h2">
              Student Data (Uploaded from .CSV file)
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DeleteOutlined />}
              color="error"
            >
              Delete (selected 0)
            </Button>
          </Box>
          <Box sx={{ height: "66vh", width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.admno}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              margin: "10px",
              justifyContent: "flex-end",
            }}
          >
            <Button style={btnStyle} variant="outlined" endIcon={<Edit />} onClick={() => setIsEditable(!isEditable)}>
              Edit
            </Button>
            <Button style={btnStyle} variant="contained" endIcon={<Send />}>
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
