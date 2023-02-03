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
import withRoot from "../../modules/withRoot";
import ViewUsersTable from "../../modules/components/admin/ViewUsersTable";
import ProtectedAdmin from "../../modules/components/protected/ProtectedAdmin";
function ViewUsers() {
  const [users, setUsers] = useState(null);
  const [reload, setReload] = useState(null);

  const setUsersFn = async () => {
    const response = await getAllUsers(localStorage.getItem("token"));
    if (response) {
      console.log(response);
      setUsers(response);
    } else {
      alert("An Error Occured!");
      console.log(response);
    }
  };

//   const handleDelete = async (email) => {
//     const response = await deleteUser(localStorage.getItem("token"), email);
//     if (response) {
//       alert("User Deleted Successfully!");
//       setReload(!reload);
//     } else {
//       alert("An Error Occured!");
//       console.log(response);
//     }
//   };

  useEffect(() => {
    setUsersFn();
  }, [reload]);

  return (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              padding: { md: "3rem", xs: "1rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: { xs: "1.5rem", md: "none" },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                sx={{
                  fontFamily: "Roboto Condensed",
                  mb: "3rem",
                  textDecoration: "underline",
                  textDecorationColor: "secondary.main",
                  textDecorationThickness: "3px",
                  textUnderlineOffset: "1rem",
                }}
              >
                Interested Tenants
              </Typography>
            </Box>
            {!users ? (
              <LoadingPage />
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
  );
}

export default withRoot(ViewUsers);
