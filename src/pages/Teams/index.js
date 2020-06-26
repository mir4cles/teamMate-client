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
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { selectTeams } from "../../store/teams/selectors";
import { fetchTeams } from "../../store/teams/actions";

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
  media: {
    height: 250,
  },
}));

export default function Teams() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const teams = useSelector(selectTeams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {teams.map((team) => (
            <Grid item key={team.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <CardMedia
                    className={classes.media}
                    image={team.logoUrl}
                    title="Team Logo"
                  />
                  <Typography variant="h5" component="h2">
                    {team.teamName}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {team.city}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {team.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/teams/${team.id}`}
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
