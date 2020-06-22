import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

import { selectToken } from "../../store/user/selectors";

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
  tabs: {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <EmojiEventsIcon
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Typography variant="h6" noWrap className={classes.title}>
            teamMate
          </Typography>
          <Link
            component={RouterLink}
            variant="button"
            color="inherit"
            className={classes.link}
            to="/support"
          >
            SUPPORT
          </Link>
          {loginLogoutControls}
        </Toolbar>
      </AppBar>

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          icon={<GroupIcon />}
          label="TEAMS"
          component={RouterLink}
          to="/teams"
        />
        <Tab
          icon={<EventNoteIcon />}
          label="EVENTS"
          component={RouterLink}
          to="/events"
        />
      </Tabs>
    </div>
  );
}
