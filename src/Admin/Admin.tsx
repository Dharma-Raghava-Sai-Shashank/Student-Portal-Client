import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { MainSidebar } from "./Sidebars/MainSidebar";
import { baseURL } from "../api";

interface QueryCardProps {
  query: string;
}

const QueryCard: React.FC<QueryCardProps> = ({ query }) => {
  const [queryResponse, setQueryResponse] = useState<string | null>(null);

  const executeQuery = async () => {
    // Implement query execution logic here, similar to previous examples.
    // Set the response using setQueryResponse(response) once the execution is done.
    const response = await fetch(`${baseURL}` + "/api/query", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setQueryResponse(data.response);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h5" gutterBottom>
        Query:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {query}
      </Typography>
      <Button onClick={executeQuery} variant="contained" color="primary">
        Execute
      </Button>
      {queryResponse !== null && (
        <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6">Query Response:</Typography>
          <Typography variant="body1">{queryResponse}</Typography>
        </Paper>
      )}
    </Paper>
  );
};

export const Admin: React.FC = () => {
  const [queries, setQueries] = useState<string[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(event.target.value);
  };

  const handleAddQuery = () => {
    if (currentQuery.trim() !== "") {
      setQueries([...queries, currentQuery]);
      setCurrentQuery("");
    }
  };

  return (
      <div className="d-flex">

      <MainSidebar />
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1} p={3}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Box width="100%" marginBottom={2}>
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom={2}>
              <Select>
                <MenuItem value="select">SELECT</MenuItem>
                {/* You can add other query types here */}
              </Select>
              <TextField
                fullWidth
                variant="outlined"
                value={currentQuery}
                onChange={handleQueryChange}
                placeholder="Enter your query"
              />
              <Button onClick={handleAddQuery} variant="contained" color="primary">
                Add
              </Button>
            </Box>
              {queries.map((query, index) => (
                <QueryCard key={index} query={query} />
              ))}
          </Box>
        </Box>
      </div>
  );
};
