import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { selectToken } from "../../store/user/selectors";

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

export default function CreateEvent() {
  const classes = useStyles();
  const token = useSelector(selectToken);

  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [sportType, setSportType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [outdoor, setOutdoor] = React.useState(false);
  const [maxPlayers, setMaxPlayers] = React.useState(25);

  function submitForm(event) {
    event.preventDefault();
    console.log(
      "data from form:",
      title,
      startDate,
      endDate,
      location,
      sportType,
      description,
      outdoor,
      maxPlayers
    );
    // dispatch(startAuction(title, parseInt(minimumBid), imageUrl));
    // setTitle("");
    // setMinimumBid("0");
    // setImageUrl("");
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
            <h1>Only registered users can create events.</h1>
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
          Create event
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
              value={title}
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
              value={startDate}
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
              value={endDate}
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
              value={location}
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
              value={sportType}
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
              value={maxPlayers}
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
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" />}
              label="This is an outdoor event"
              onChange={() => setOutdoor(!outdoor)}
              checked={outdoor}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={submitForm}
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
}
