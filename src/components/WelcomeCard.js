import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
  },
  media: {
    height: 100,
  },
});

export default function WelcomeCard() {
  const classes = useStyles();
  const isDesktop = window.innerWidth < 1000;

if (!isDesktop) {
  return (
    <div>
      <center>
    <img src="https://i.imgur.com/h5xCq4W.png"></img>
    </center>
    </div>
  );
} else {
  return (
    <div>
      <center>
    <img src="https://i.imgur.com/Y8RFKfg.png"></img>
    </center>
    </div>
  );
}
}