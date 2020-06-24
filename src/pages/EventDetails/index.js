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
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";

import { selectEventDetails } from "../../store/eventDetails/selectors";
import { fetchEventById } from "../../store/eventDetails/actions";
import { attendEvent } from "../../store/user/actions";
import { selectToken, selectUser } from "../../store/user/selectors";

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

  const attendingIds = event.attending.map((user) => user.id);
  const attendButton = attendingIds.includes(user.id) ? (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<EventBusyIcon />}
      onClick={() => dispatch(attendEvent(id))}
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
                {event.attending.map((attendee) => {
                  return (
                    <List key={attendee.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar src={attendee.avatarUrl} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={attendee.name}
                          secondary={attendee.email}
                        />
                      </ListItem>
                    </List>
                  );
                })}
              </CardContent>
              {token ? <CardActions>{attendButton}</CardActions> : null}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
