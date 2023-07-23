import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Companyfooter } from "./Companyfooter";
import CompanyHeader from "./CompanyHeader";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //
  };

  return (
    <div>
      <CompanyHeader />
      <Box
        className="blue1b"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          mt: 5,
          pt: 4,
        }}
      >
        <Box
          className="bg-white"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 700,
            mx: "auto",
            p: 2,
            border: "1px dotted  gray",
            borderRadius: "12px",
            boxShadow: 1,
          }}
        >
          <Typography variant="h5" align="center" mb={2} className="blue4">
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              multiline
              rows={4}
            />
            <Button
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                backgroundColor: "#081231",
                color: "#fff",
                border: "1px solid #081231",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#081231",
                },
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
      <Companyfooter />
    </div>
  );
}
