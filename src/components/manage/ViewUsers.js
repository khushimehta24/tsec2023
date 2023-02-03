import { Add } from "@mui/icons-material";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  Grid,
  Fab,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { getInterestedUsersByOwner } from "../../services/api";

import ViewUsersTable from "./ViewUsersTable";

function ViewUsers() {
  const [users, setUsers] = useState(null);
  const [reload, setReload] = useState(null);

  const setUsersFn = async () => {
    const response = await getInterestedUsersByOwner(localStorage.getItem("ccpToken"))
    if (response) {
      console.log(response.users);
      setUsers(response.users);
    } else {
      alert("An Error Occured!");
      console.log(response);
    }
  };

  const handleDelete = async (email) => {
    // const response = await deleteUser(localStorage.getItem("token"), email);
    // if (response) {
    //   alert("User Deleted Successfully!");
    //   setReload(!reload);
    // } else {
    //   alert("An Error Occured!");
    //   console.log(response);
    // }
  };

  useEffect(() => {
    setUsersFn();
  }, [reload]);

  return (
 
      <div>

        <Grid container>
          <Grid
            item
            xs={12}
           
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: { xs: "1.5rem", md: "none" },
              }}
            >
              <h2>
                Interested Tenants
              </h2>

             
            </Box>
            {!users ? (
              <CircularProgress color="primary"/>
            ) : (
              <ViewUsersTable
                users={users}
                setUsers={setUsers}
                setReload={setReload}
                handleDelete={handleDelete}
              />
            )}
          </Grid>
        </Grid>
      </div>
 
  );
}

export default ViewUsers;
