import React, { useState, useContext, StateContext, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProfileDetails from './ProfileDetails.js';
import { HashkingsAPI } from '../service/HashkingsAPI';
 
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 500
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: 100,
    width: 100,
    marginLeft: '15px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const {username} = useState();

  const [guild, setGuild] = useState("");
  const [experience, setExperience] = useState([0]);
  const [breederName, setBreederName] = useState("");

  const loadData = async (ourUsername) => {
    
    const urlAPI = 'https://hashkings-api.herokuapp.com/u/'+ ourUsername;
    
    const response = await fetch(urlAPI);
    const data = await response.text();
    const fetchData = JSON.parse(data);
    
    if(fetchData) {
    var xpsValue = data.xps;
    var alliance = data.alliance;
    var breederName = data.breeder;

    setExperience(xpsValue);
    setGuild(alliance);
    setBreederName(breederName);
  }
}

  useEffect(() => {
    loadData(username);
  }, [username]);

  return (
    <Grid container spacing={1}>
    <Card className={classes.root}>
    <Grid xs={3}>
      <CardMedia
            className={classes.cover}
            image="https://i.imgur.com/ymrzJc9.png"
            title="Canna Curate"
          />
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4">
            {breederName}
          </Typography>
          <br/>
          <Typography variant="subtitle1">
            {guild}
          </Typography>
          <hr/>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            XP: {experience}
          </Typography>
        </CardContent>
        
     
        </Grid>
        <br/>
        <Grid xs={9}>
        <ProfileDetails />  
        </Grid>
    </Card>
    </Grid>
    
  );
}