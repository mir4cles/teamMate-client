import React from "react";

import {
  Container,
  Typography,
  Grid,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
}));

const landingCards = [
  {
    title: "Play",
    description: [
      "Find & attend pickup games",
      "Whatever type of sport",
      "Meet people in real life",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
    url: "/events",
  },
  {
    title: "Free",
    description: ["Life-time fun", "Unlimited games", "No strings attached"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
    url: "/signup",
  },
];

export default function Home() {
  const classes = useStyles();

  return (
    <>
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
      <Container maxWidth="md" component="main">
        <Grid
          direction="row"
          align="flex-start"
          justify="center"
          container
          spacing={5}
        >
          {landingCards.map((landingCard) => (
            <Grid item key={landingCard.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={landingCard.title}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                    {landingCard.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={landingCard.buttonVariant}
                    color="primary"
                    component={Link}
                    to={`${landingCard.url}`}
                  >
                    {landingCard.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
