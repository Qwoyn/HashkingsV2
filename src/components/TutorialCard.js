import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { GerminateIconBlack } from './Icons';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  font: {
    fontFamily: '"Jua", sans-serif',
    color: "#FFCD33",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "transparent",
    fontFamily: '"Jua", sans-serif'
  }
}));

export default function TutorialCard() {
  const classes = useStyles();
  const isDesktop = window.innerWidth < 1000;

if(!isDesktop) {
  return (
    <Container fixed>
    <Grid container spacing={3}>
      <Grid xs={2}>
        </Grid>
        <Grid xs={8}>
        <Paper elevation={0} className={classes.paper}>
              <Typography gutterBottom variant="h1" component="h1" className={classes.font}>
                Coming Soon!
              </Typography>
              <Typography gutterBottom variant="h5" component="h2" className={classes.font}>
              <a href="https://peakd.com/hashkings/@hashkings/hashkings-roadmap-and-pre-sale-announcement">
              Learn more at peakd.com
              </a>
              </Typography>
        </Paper>
      </Grid>
      <Grid xs={2}>
        </Grid>
    </Grid>
    </Container>
  );
} else {
  return (
    <Container fixed>
    <Grid container spacing={3}>
        <Grid xs={12}>
        <Paper elevation={0} className={classes.paper}>
              <Typography gutterBottom variant="h3" component="h3" className={classes.font}>
                Coming Soon!
              </Typography>
              <Typography gutterBottom variant="h4" component="h4" className={classes.font}>
              <a href="https://peakd.com/hashkings/@hashkings/hashkings-roadmap-and-pre-sale-announcement">
              Learn more at peakd.com
              </a>
              </Typography>
        </Paper>
      </Grid>
    </Grid>
    </Container>
  );
}
}