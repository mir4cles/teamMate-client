import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { selectTeamDetails } from "../../store/teamDetails/selectors";
import { fetchTeamById } from "../../store/teamDetails/actions";

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
    height: 400,
  },
}));

export default function TeamDetails() {
  const classes = useStyles();

  const { id } = useParams();
  const team = useSelector(selectTeamDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamById(id));
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
          Team Details
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item key={selectTeamDetails.id} xs={12} sm={6} md={4}>
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
                  Hometown: {team.city}
                </Typography>
                <Typography variant="body2" component="p">
                  {team.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
