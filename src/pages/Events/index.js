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
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { selectEvents } from "../../store/events/selectors";
import { fetchEvents } from "../../store/events/actions";
import { selectToken } from "../../store/user/selectors";
import { selectAppLoading } from "../../store/appState/selectors";

import Loading from "../../components/Loading";

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
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

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
        <Grid direction="row" align="flex-start" container spacing={5}>
          {events.map((event) => (
            <Grid item key={event.id} xs={6}>
              <Card>
                <CardContent>
                  <CardHeader
                    avatar={<Avatar src={event.user.avatarUrl} />}
                    title={event.title}
                    subheader={event.location}
                  />
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    variant="subtitle1"
                  >
                    {event.startDateTime}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {event.description}
                  </Typography>
                  {event.attending.length ? (
                    <Typography
                      variant="subtitle2"
                      component="p"
                      color="textSecondary"
                    >
                      {event.attending.length} attending
                    </Typography>
                  ) : null}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/events/${event.id}`}
                  >
                    See details
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
