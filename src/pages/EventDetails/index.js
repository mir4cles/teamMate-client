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
        <Grid
          direction="column"
          justify="center"
          alignItems="center"
          container
          spacing={5}
        >
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
                {event.attandees.map((attendee) => {
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
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
