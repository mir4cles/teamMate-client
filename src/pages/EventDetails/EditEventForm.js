import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { selectToken } from "../../store/user/selectors";
import { editEvent } from "../../store/user/actions";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

export default function EditEventForm(props) {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const event = props.props;
  const eventId = event.id;

  const dispatch = useDispatch();

  const [title, setTitle] = React.useState(event.title);
  const [startDate, setStartDate] = React.useState(event.startDateTime);
  const [endDate, setEndDate] = React.useState(event.endDateTime);
  const [location, setLocation] = React.useState(event.location);
  const [sportType, setSportType] = React.useState(event.sportType);
  const [description, setDescription] = React.useState(event.description);
  const [outdoor, setOutdoor] = React.useState(event.outdoor);
  const [maxPlayers, setMaxPlayers] = React.useState(25);

  function submitForm(event) {
    event.preventDefault();
    dispatch(
      editEvent(
        eventId,
        title,
        startDate,
        endDate,
        location,
        sportType,
        description,
        outdoor,
        maxPlayers
      )
    );
  }

  if (token === null) {
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
            <h1>Only registered users can edit events.</h1>
          </Typography>
        </Container>
      </>
    );
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
          {event.title}
        </Typography>
      </Container>
      <Container maxWidth="sm" component="main">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Event title"
              fullWidth
              variant="outlined"
              defaultValue={event.title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="startDateTime"
              name="startDateTime"
              label="Start"
              type="datetime-local"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              defaultValue={event.startDateTime}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="endDateTime"
              name="endDateTime"
              label="End"
              type="datetime-local"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              defaultValue={event.endDateTime}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="location"
              name="location"
              label="Location"
              fullWidth
              variant="outlined"
              defaultValue={event.location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              id="sportType"
              name="sportType"
              label="Sport type"
              fullWidth
              variant="outlined"
              defaultValue={event.sportType}
              onChange={(event) => setSportType(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id="maxPlayers"
              name="maxPlayers"
              label="Maximum players"
              fullWidth
              type="number"
              variant="outlined"
              defaultValue={event.maxPlayers}
              onChange={(event) => setMaxPlayers(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              fullWidth
              rows={4}
              variant="outlined"
              defaultValue={event.description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" />}
              label="This is an outdoor event"
              onChange={() => setOutdoor(!outdoor)}
              defaultValue={event.outdoor}
              checked={outdoor}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={submitForm}>
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
}
