import React from "react";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { AppBar, Toolbar, Button, Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
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
          <Typography variant="h6" noWrap className={classes.title}>
            teamMate
          </Typography>
          <nav>
            <Link
              variant="button"
              color="inherit"
              href="#"
              className={classes.link}
            >
              MYTEAM
            </Link>
            <Link
              variant="button"
              color="inherit"
              href="#"
              className={classes.link}
            >
              EVENTS
            </Link>
            <Link
              variant="button"
              color="inherit"
              href="#"
              className={classes.link}
            >
              SUPPORT
            </Link>
          </nav>
          <Button color="inherit" variant="outlined">
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
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
