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
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";

import Loading from "../../components/Loading";
import eventHeader from "../../images/teammate.jpg";

import { selectEvents } from "../../store/events/selectors";
import { fetchEvents } from "../../store/events/actions";
import { selectToken } from "../../store/user/selectors";
import { selectAppLoading } from "../../store/appState/selectors";

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
  media: {
    height: 140,
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
      <Container maxWidth="md" component="main" className={classes.heroContent}>
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
        <Grid
          direction="row"
          align="flex-start"
          justify="center"
          container
          spacing={5}
        >
          {events.map((event) => (
            <Grid item key={event.id} xs={10} sm={5} md={5}>
              <Card>
                <CardMedia
                  className={classes.media}
                  image={eventHeader}
                  title="Contemplative Reptile"
                />
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
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${event.attending.length} people attending`}
                        />
                      </ListItem>
                    </List>
                  ) : null}
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    component={Link}
                    to={`/events/${event.id}`}
                    className={classes.button}
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
