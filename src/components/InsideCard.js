import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
  },
  media: {
    height: 360,
  },
  paper: {
    backgroundColor: "transparent",
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <center>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/X2p6qFT_Zjg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </center>
    </Paper>
  );
}