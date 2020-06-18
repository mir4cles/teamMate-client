import React from "react";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { AppBar, Toolbar, Button, Link, Tabs, Tab } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { Link as RouterLink } from "react-router-dom";
import GroupIcon from "@material-ui/icons/Group";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

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
          <Button
            color="inherit"
            variant="outlined"
            component={RouterLink}
            to="/login"
          >
            LOGIN
          </Button>
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
          label="MY TEAM"
          component={RouterLink}
          to="/myteam"
        />
        <Tab
          icon={<EventNoteIcon />}
          label="EVENTS"
          component={RouterLink}
          to="/events"
        />
      </Tabs>
    </div>
    // <Navbar bg="light" expand="lg">
    //   <Navbar.Brand as={NavLink} to="/">
    //     YOUR PROJECT NAME
    //   </Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav style={{ width: "100%" }} fill>
    //       <NavbarItem path="/" linkText="Home" />
    //       <NavbarItem path="/other" linkText="Other" />
    //       {loginLogoutControls}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
}
