import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { selectEvents } from "../../store/events/selectors";
import { fetchEvents } from "../../store/events/actions";
import { selectToken } from "../../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Events() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const events = useSelector(selectEvents);

  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
        {token ? (
          <Fab
            size="medium"
            color="secondary"
            className={classes.fab}
            aria-label="create event"
            component={Link}
            to="/create-event"
          >
            <AddIcon />
          </Fab>
        ) : null}
      </Container>
      <Container maxWidth="md" component="main">
        <Grid
          direction="column"
          justify="center"
          alignItems="center"
          container
          spacing={5}
        >
          {events.map((event) => (
            <Grid item key={event.id} xs={12} sm={12} md={12}>
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
                  {event.attandees.length ? (
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      {event.attandees.length} attending
                    </Typography>
                  ) : null}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    color="primary"
                    to={`/events/${event.id}`}
                  >
                    See details
                  </Button>
                  <Button size="small" color="primary">
                    Attend event
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
