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
  ListItemIcon,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EditIcon from "@material-ui/icons/Edit";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import Loading from "../../components/Loading";
import EditEventForm from "./EditEventForm";
import eventHeader from "../../images/teammate.jpg";

import { selectEventDetails } from "../../store/eventDetails/selectors";
import { fetchEventById } from "../../store/eventDetails/actions";
import { attendEvent, cancelAttendEvent } from "../../store/user/actions";
import { selectToken, selectUser } from "../../store/user/selectors";
import { selectAppLoading } from "../../store/appState/selectors";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  title: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(1),
  },
  media: {
    height: 140,
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

  const attendingIds = event.attending.map((user) => user.id);
  const attendButton = attendingIds.includes(user.id) ? (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<EventBusyIcon />}
      onClick={() => dispatch(cancelAttendEvent(id))}
    >
      Don't go
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
          maxWidth="md"
          component="main"
          className={classes.heroContent}
        >
          <Grid
            direction="column"
            justify="center"
            alignItems="center"
            container
            spacing={5}
          >
            <Grid item key={event.id} xs={11} sm={11} md={8}>
              <Card>
                <CardMedia
                  className={classes.media}
                  image={eventHeader}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography variant="h4" component="h2">
                    {event.title}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <ScheduleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Starts: ${event.startDateTime}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={event.location} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${
                          event.sportType ? event.sportType : "to be decided"
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Capacity: ${event.maxPlayers}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonPinIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Hosted by: ${event.user.name}`} />
                    </ListItem>
                  </List>
                  <Typography variant="h6" component="h6">
                    Description
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event.description}
                  </Typography>
                  {event.attending.length ? (
                    <List dense>
                      <Typography variant="h6">Attending:</Typography>
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
          maxWidth="md"
          component="main"
          className={classes.heroContent}
        >
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
