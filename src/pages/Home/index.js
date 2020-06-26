import React from "react";

import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        teamMate
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        Look for pickup games or host private events.
        <br />
        Join a team or ride solo.
      </Typography>
    </Container>
  );
}
