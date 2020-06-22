import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { selectEventDetails } from "../../store/eventDetails/selectors";
import { fetchEventById } from "../../store/eventDetails/actions";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Events() {
  const classes = useStyles();

  const { id } = useParams();
  const event = useSelector(selectEventDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  return (
    <>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Events
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {event.startDateTime}
                </Typography>
                <Typography variant="h5" component="h2">
                  {event.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Location: {event.location}
                </Typography>
                <Typography variant="body2" component="p">
                  {event.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
