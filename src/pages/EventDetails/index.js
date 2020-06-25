import React, { useEffect, useState } from "react";
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
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EditIcon from "@material-ui/icons/Edit";

import Loading from "../../components/Loading";
import EditEventForm from "./EditEventForm";

import { selectEventDetails } from "../../store/eventDetails/selectors";
import { fetchEventById } from "../../store/eventDetails/actions";
import {
  attendEvent,
  cancelAttendEvent,
  editEvent,
} from "../../store/user/actions";
import { selectToken, selectUser } from "../../store/user/selectors";
import { selectAppLoading } from "../../store/appState/selectors";

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
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Events() {
  const classes = useStyles();
  const { id } = useParams();
  const event = useSelector(selectEventDetails);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const loading = useSelector(selectAppLoading);

  const spotsLeft = event.maxPlayers - event.attending.length;

  const attendingIds = event.attending.map((user) => user.id);
  const attendButton = attendingIds.includes(user.id) ? (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<EventBusyIcon />}
      onClick={() => dispatch(cancelAttendEvent(id))}
    >
      Cancel
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<EventAvailableIcon />}
      onClick={() => dispatch(attendEvent(id))}
    >
      Attend
    </Button>
  );

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  if (!editMode) {
    return (
      <>
        <Container
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Event details
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid
            direction="column"
            justify="center"
            alignItems="center"
            container
            spacing={5}
          >
            <Grid item key={event.id} xs={12} sm={10} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    {event.title}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Start of event: {event.startDateTime}
                  </Typography>
                  <Typography
                    className={classes.pos}
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    Location: {event.location}
                  </Typography>
                  <Typography
                    className={classes.pos}
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    Sport: {event.sportType ? event.sportType : "to be decided"}
                  </Typography>
                  <Typography
                    className={classes.pos}
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    Capacity: {event.maxPlayers}
                  </Typography>
                  <Typography
                    className={classes.pos}
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    Hosted by: {event.user.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event.description}
                  </Typography>
                  {event.attending.length ? (
                    <List dense>
                      <Typography variant="subtitle2" color="textSecondary">
                        Attending ({spotsLeft} spots available):
                      </Typography>
                      {event.attending.map((attendee) => {
                        return (
                          <ListItem key={attendee.id} alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar src={attendee.avatarUrl} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={attendee.name}
                              secondary={attendee.email}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : null}
                </CardContent>
                <CardActions>
                  {token ? attendButton : null}
                  {event.userId === user.id ? (
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<EditIcon />}
                      onClick={() => setEditMode(true)}
                    >
                      Edit event
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Edit event details
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid
            direction="column"
            justify="center"
            alignItems="center"
            container
            spacing={5}
          >
            <Grid item xs={12} sm={10} md={8}>
              <Card>
                <CardContent>
                  <EditEventForm props={event} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
