import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { MainSidebar } from './Sidebars/MainSidebar'
import { baseURL } from '../api'

interface QueryCardProps {
  query: string
  onDelete: () => void // Callback to delete the card
}

interface QueryResponse {
  data: any[] // Modify the data type according to your API response structure
  success: boolean
}

const QueryCard: React.FC<QueryCardProps> = ({ query, onDelete }) => {
  const [queryResponse, setQueryResponse] = useState<QueryResponse | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isResponseVisible, setIsResponseVisible] = useState(true)
  const [tableHeaders, setTableHeaders] = useState<string[]>([])
  const [tableData, setTableData] = useState<any[]>([])

  const executeQuery = async () => {
    try {
      const response = await fetch(`${baseURL}/admin/dbquery/${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      const data: QueryResponse = await response.json()
      console.log(JSON.stringify(data, null, 2))
      setQueryResponse(data)

      // Extract table headers from the first item in the data array
      if (data.data && data.data.length > 0) {
        const firstItem = data.data[0]
        const headers = Object.keys(firstItem)
        setTableHeaders(headers)
        setTableData(data.data)
      }
    } catch (error) {
      console.error('Error executing query:', error)
    }
  }

  const handleHideClick = () => {
    setIsResponseVisible(false)
  }

  useEffect(() => {
    executeQuery()
  }, [])

  return (
    isVisible && (
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Query:
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: 'italic', padding: '0 0 10px 0' }}
        >
          {query}
        </Typography>
        {/* <Button onClick={executeQuery} variant="contained" color="primary">
          Execute
        </Button> */}
        <Button
          onClick={handleHideClick}
          variant="contained"
          color="secondary"
          sx={{ margin: '0 5px 0 0' }}
        >
          Hide
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
        {isResponseVisible && queryResponse !== null && queryResponse.success && (
          // <div style={{ maxWidth: '0%' }}>
          <Paper
            elevation={1}
            sx={{ padding: 2, marginTop: 2, overflowX: 'auto' }}
          >
            <Typography variant="h6">Query Response:</Typography>
            {tableHeaders.length > 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {tableHeaders.map((header, index) => (
                        <TableCell key={index}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {tableHeaders.map((header, colIndex) => (
                          <TableCell key={colIndex}>{row[header]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
          // </div>
        )}
      </Paper>
    )
  )
}

export const Admin: React.FC = () => {
  const [queries, setQueries] = useState<string[]>([])
  const [currentQuery, setCurrentQuery] = useState('')

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(event.target.value)
  }

  const handleAddQuery = () => {
    if (currentQuery.trim() !== '') {
      setQueries([...queries, currentQuery])
      setCurrentQuery('')
    }
  }

  const handleDeleteQuery = (index: number) => {
    const updatedQueries = [...queries]
    updatedQueries.splice(index, 1)
    setQueries(updatedQueries)
  }

  return (
    <div className="d-flex" >
      <MainSidebar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexGrow={1}
        p={3}
        sx={{ width: "44%"}}
      >
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box width="100%" marginBottom={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom={2}
          >
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
            <Button
              onClick={handleAddQuery}
              variant="contained"
              color="primary"
              sx={{ margin: '0 0 0 10px', height: '3rem' }}
            >
              Add
            </Button>
          </Box>
          {queries.map((query, index) => (
            <QueryCard
              key={index}
              query={query}
              onDelete={() => handleDeleteQuery(index)}
            />
          ))}
        </Box>
      </Box>
    </div>
  )
}
