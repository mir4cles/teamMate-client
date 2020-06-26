import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { IconButton } from "@material-ui/core";

import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function Navigation() {
  const token = useSelector(selectToken);
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
  const classes = useStyles();
  const user = useSelector(selectUser);
  const ref = React.createRef();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={RouterLink}
            to="/"
          >
            <EmojiEventsIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            teamMate
          </Typography>
          <Link
            component={RouterLink}
            variant="button"
            color="inherit"
            ref={ref}
            className={classes.link}
            to="/events"
          >
            EVENTS
          </Link>
          {token ? (
            <Link
              variant="button"
              color="inherit"
              ref={ref}
              className={classes.link}
              component={RouterLink}
              to={`/teammate/${user.id}`}
            >
              {user.name}
            </Link>
          ) : null}
          {loginLogoutControls}
        </Toolbar>
      </AppBar>
    </div>
  );
}
