import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box, Divider, Button, TextField, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoneIcon from '@mui/icons-material/Done';
import moment from "moment";
import { Typography, Tooltip } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import PreviewIcon from "@mui/icons-material/Preview";
import { ConfirmationNumber } from "@mui/icons-material";

moment().format();

const fields = ["Email", "Phone", "Type"];

const columns = [
    {
  
        label: "Property",
        minWidth: 100,
      },
      {
  
        label: "Location",
        minWidth: 50,
      },
  {
  
    label: "Name",
    minWidth: 50,
  },
  {
    
    label: "Email",
    minWidth: 50,
  },
  {
    
    label: "Phone",
    minWidth: 50,
  },
  {
    label: "Gender",
    minWidth: 100,
  },
  {
   
    label: "Age",
    minWidth: 100,
    
  },
];
function Row(props) {
  const { row, setUsers, setReload, handleDelete } = props;
  const [open, setOpen] = React.useState(false);
  
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >
                {
                    row.property.name
                }
        
            </TableCell>
            <TableCell >
                {
                    row.property.area_location
                }
        
            </TableCell>
        <TableCell >
                {
                    row.user.name
                }
        
            </TableCell>
            <TableCell >
                {
                    row.user.email
                }
        
            </TableCell>
            <TableCell >
                {
                    row.user.phone
                }
        
            </TableCell>
            <TableCell >
                {
                    row.user.gender
                }
        
            </TableCell>
            <TableCell >
                {
                    row.user.age
                }
        
            </TableCell>
            
            <TableCell>
            <Tooltip title="Accept User">
                <IconButton
                    aria-label="accept"
                    onClick={() => {
                        handleDelete(row.email)
                    }}
                >
                    <DoneIcon />
                </IconButton>
            </Tooltip>

           
        </TableCell>
        <TableCell>
            <Tooltip title="Delete User">
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        handleDelete(row.email)
                    }}
                >
                    <CancelIcon />
                </IconButton>
            </Tooltip>

           
        </TableCell>
     
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {fields.map((field) => {
                const key = field.toLowerCase();
                return (
                  <Box key={field}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mb: "0.1rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.2rem",
                          width: { md: "10%", lg: "8%", xs: "11%" },
                        }}
                      >
                        {field}:
                      </Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                        {row["property"][key]}
                    
                      </Typography>
                    </Box>
                    <Divider
                      sx={{ border: "1px solid #f4f4f4", height: "0.1px" }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function ViewUsersTable({
  users,
  setUsers,
  setReload,
  handleDelete
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = users;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={1}>
      {users.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5rem",
          }}
        >
          <Typography variant="h5" color="primary">
            NO USERS YET!
          </Typography>
        </Box>
      ) : (
        <Box>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell />
                  {columns.map((column) => (
                    <TableCell
                      key={column.label}
                      
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell style={{ minWidth: 150 }}>
                    <Typography>Accept</Typography>
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    <Typography>Delete</Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ minWidth: 150 }}
                  ></TableCell>
                  {/* <TableCell
                    align="right"
                    style={{ minWidth: 50 }}
                  ></TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <Row
                        row={row}
                        key={row._id}
                        setUsers={setUsers}
                        setReload={setReload}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Paper>
  );
}


export default ViewUsersTable;