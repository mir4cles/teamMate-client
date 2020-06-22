import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function LoggedOut() {
  return (
    <>
      <Button
        color="inherit"
        variant="outlined"
        component={RouterLink}
        to="/login"
      >
        LOGIN
      </Button>
    </>
  );
}
