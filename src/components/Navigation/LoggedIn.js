import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const classes = useStyles();
  return (
    <>
      <Link
        component={RouterLink}
        variant="button"
        color="inherit"
        className={classes.link}
        to={`/teammate/${user.id}`}
      >
        {user.name}
      </Link>

      <Button
        color="inherit"
        variant="outlined"
        onClick={() => dispatch(logOut())}
      >
        LOGOUT
      </Button>
    </>
  );
}
