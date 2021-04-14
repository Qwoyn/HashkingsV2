import React, { useState, useEffect, useContext } from "react";
import {StateContext} from "../App";
import {sign} from "hivesigner";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import WelcomeCard from './WelcomeCard';
import {Button} from "primereact/button";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Parallax } from 'react-parallax';
import { Redirect } from 'react-router';
import TrendingHomePage from './TrendingHomePage';
import TutorialCard from './TutorialCard';
import { shadows } from '@material-ui/system';
import useHiveKeychain from "../hooks/useHiveKeychain"; 

const useStyles = makeStyles(theme => ({
  navWidth: {
    width: "auto",
    backgroundColor: "transparent",
    borderColor: "#000000"
  },
  root: {
    flexGrow: 1,
    height: "auto",
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A"
  },
  paperBlacky: {
    padding: theme.spacing(1),
    backgroundColor: "#000000",
  },
  card: {
    maxWidth: 'auto',
    backgroundColor: "transparent",
  },
  media: {
    height: 300,
    width: 250,
  },
  mediaTwo: {
    height: 100,
    width: 270,
  },
}));

export const HomePage = () => {
const {username} = useContext(StateContext);
const classes = useStyles();
const isDesktop = window.innerWidth < 1000;
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSubmitting1, setIsSubmitting1] = useState(false);
const [isSubmitting2, setIsSubmitting2] = useState(false);
const image1 = "https://i.imgur.com/j2CGYh2.jpg";

const [seedAsia, setSeedAsia] = useState();
const [seedAfrica, setSeedAfrica] = useState();
const [seedAfghanistan, setSeedAfghanistan] = useState();
const [seedJamaica, setSeedJamaica] = useState();
const [seedMexico, setSeedMexico] = useState();
const [seedSouthAmerica, setSeedSouthAmerica] = useState();

const [seedAsiaPrices, setAsiaPrices] = useState([0]);
const [seedAfricaPrices, setAfricaPrices] = useState([0]);
const [seedAfghanistanPrices, setAfghanistanPrices] = useState([0]);
const [seedJamaicaPrices, setJamaicaPrices] = useState([0]);
const [seedMexicoPrices, setMexicoPrices] = useState([0]);
const [seedSouthAmericaPrices, setSouthAmericaPrices] = useState([0]);

const [claimsStatusBud, setClaimStatusBud] = useState([false])
const [claimsStatusWater, setClaimStatusWater] = useState([false])
const [claimsStatusAvatar, setClaimStatusAvatar] = useState([false])

const [claim, setClaimStatus] = useState([false])

const [asiaBundles, setAsiaQuantity] = useState([0]);
const [africaBundles, setAfricaQuantity] = useState([0]);
const [afghanistanBundles, setAfghanistanQuantity] = useState([0]);
const [jamaicaBundles, setJamaicaQuantity] = useState([0]);
const [mexicoBundles, setMexicoQuantity] = useState([0]);
const [southAmericaBundles, setSouthAmericaQuantity] = useState([0]);

const hasHiveKeychain = useHiveKeychain();

const loadPriceData = async () => {
    
  const urlAPI = 'https://hashkings.xyz/';
  
  const response = await fetch(urlAPI);
  const pricedata = await response.json();

  var seedAsiaPrice = pricedata.stats.prices.bundles.asiaBundle;
  var seedAfricaPrice = pricedata.stats.prices.bundles.africaBundle;
  var seedAfghanistanPrice = pricedata.stats.prices.bundles.afghanistanBundle;
  var seedJamaicaPrice = pricedata.stats.prices.bundles.jamaicaBundle;
  var seedMexicoPrice = pricedata.stats.prices.bundles.mexicoBundle;
  var seedSouthAmericaPrice = pricedata.stats.prices.bundles.southAmericaBundle;

  var asiaBundles = pricedata.stats.supply.land.asia;
  var africaBundles = pricedata.stats.supply.land.africa;
  var afghanistanBundles = pricedata.stats.supply.land.afghanistan;
  var jamaicaBundles = pricedata.stats.supply.land.jamaica;
  var mexicoBundles = pricedata.stats.supply.land.mexico;
  var southAmericaBundles = pricedata.stats.supply.land.southAmerica;

  var claimStatusBud = pricedata.users[username].claimed.bud;
  var claimStatusWater = pricedata.users[username].claimed.water;
  var claimStatusAvatar = pricedata.users[username].claimed.avatar;

  var amountOfBud = pricedata.users[username].hkwater;

  setClaimStatus(amountOfBud);

  setClaimStatusBud(claimStatusBud);
  setClaimStatusWater(claimStatusWater);
  setClaimStatusAvatar(claimStatusAvatar);

  setAsiaPrices(seedAsiaPrice);
  setAfricaPrices(seedAfricaPrice);
  setAfghanistanPrices(seedAfghanistanPrice);
  setJamaicaPrices(seedJamaicaPrice);
  setMexicoPrices(seedMexicoPrice);
  setSouthAmericaPrices(seedSouthAmericaPrice);

  setAsiaQuantity(asiaBundles);
  setAfricaQuantity(africaBundles);
  setAfghanistanQuantity(afghanistanBundles);
  setJamaicaQuantity(jamaicaBundles);
  setMexicoQuantity(mexicoBundles);
  setSouthAmericaQuantity(southAmericaBundles);
}

useEffect(() => {
  loadPriceData();
}, []);

const [gardens, setGardens] = useState([]);

const {steemConnectAPI} = useContext(StateContext);


const handleSubmitWater = () => {
  if (username) {
    setIsSubmitting(true);

    const custom_json_id = "qwoyn_claim_water";
    const custom_JSON = JSON.stringify({claiming: "water"});

    steemConnectAPI.customJson(
      [],
      [username], 
      custom_json_id,
      custom_JSON
    );
  }
};

const handleSubmitAvatar = () => {
  if (username) {
    setIsSubmitting1(true);

    const custom_json_id = "qwoyn_claim_avatar";
    const custom_JSON = JSON.stringify({claiming: "avatars"});

    steemConnectAPI.customJson(
      [],
      [username], 
      custom_json_id,
      custom_JSON
    );
  }
};

const handleSubmitBuds = () => {
  if (username) {
    setIsSubmitting2(true);

    const custom_json_id = "qwoyn_claim_bud";
    const custom_JSON = JSON.stringify({claiming: "buds"});

    steemConnectAPI.customJson(
      [],
      [username], 
      custom_json_id,
      custom_JSON
    );
  }
};


let buttonLabel1 = "Claim";
if (isSubmitting) buttonLabel1 = "Claimed";
if (!username) buttonLabel1 = "Please Sign in";
if (claimsStatusWater === true) buttonLabel1 = "Claimed";

let buttonLabel2 = "Claim";
if (isSubmitting1) buttonLabel2 = "Claimed";
if (!username) buttonLabel2 = "Please Sign in";
if (claimsStatusAvatar === true) buttonLabel2 = "Claimed";

let buttonLabel3 = "Claim";
if (isSubmitting2) buttonLabel3 = "Claimed";
if (!username) buttonLabel3 = "Please Sign in";
if (claimsStatusBud === true) buttonLabel3 = "Claimed";

if (!isDesktop) {
  if (username) {
  return(
    <Parallax blur={1} bgImage={image1} strength={500}>
    <div className={classes.root}>
    <br/>
    <br/>
      <center>
        <img src="https://i.imgur.com/yFfJJUK.png"></img>
      </center>
    <br/>
    <br/>
      <Container fixed>
      <Grid container spacing={3}>
      <Grid item xs> 
      <Card className={classes.card} raised={true} boxShadow={0}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/JRb7bDV.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Avatars!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                Users who participated in the presale can claim our exclusive magical avatars here! <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username || (claimsStatusAvatar === true) || (claim === 0)}
              label={buttonLabel2}
              onClick={handleSubmitAvatar}
              />
            </CardContent>
          </Card>
      </Grid>

      <Grid item xs> 
      <Card className={classes.card} raised={true} boxShadow={0}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/S6myoym.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Water!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                Claim the water that will be used on the first day of gameplay if you have participated in the presale. <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username || (claimsStatusWater === true) || (claim === 0)}
              label={buttonLabel1}
              onClick={handleSubmitWater}
              />
            </CardContent>
          </Card>
      </Grid>
      
      <Grid item xs> 
      <Card className={classes.card} raised={true} boxShadow={0}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/XaaSup9.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Bud!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                To kick off seed production and the minting of MOTA users who participated can claim 1 BUD. <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username || (claimsStatusBud === true) || (claim === 0)}
              label={buttonLabel3}
              onClick={handleSubmitBuds}
              />
            </CardContent>
          </Card>
      </Grid>

      </Grid>
      </Container>

    </div>
    </Parallax>
    );
    } else {
      return (
        <Redirect to='/login'/>
      );
    }
    } else {
    if (username) {
    return (
      <Parallax blur={1} bgImage={image1} strength={500}>
      <div className={classes.root}>
  
        <center>
          <img src="https://i.imgur.com/yFfJJUKs.png"></img>
        </center>
        <br/>
        <br/>
        <Container fixed>
      <Grid container spacing={3}>
      <Grid item xs> 
      <Card className={classes.card} raised={true} boxShadow={0}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/JRb7bDV.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Avatars!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                Users who participated in the presale can claim our exclusive magical avatars here! <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username || (claimsStatusAvatar === true) || (claim === 0)}
              label={buttonLabel2}
              onClick={handleSubmitAvatar}
              />
            </CardContent>
          </Card>
      </Grid>

      <Grid item xs> 
      <Card className={classes.card} raised={true} boxShadow={0}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/S6myoym.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Water!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                Claim the water that will be used on the first day of gameplay if you have participated in the presale. <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username || (claimsStatusWater === true) || (claim === 0)}
              label={buttonLabel1}
              onClick={handleSubmitWater}
              />
            </CardContent>
          </Card>
      </Grid>
      
      <Grid item xs> 
      <Card className={classes.card} raised={true} boxShadow={0}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/XaaSup9.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Claim your Bud!</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                To kick off seed production and the minting of MOTA users who participated can claim 1 BUD. <u>CAN ONLY BE CLAIMED ONCE!</u>
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b></font> <font color="green" className={classes.font}>FREE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username || (claimsStatusBud === true) || (claim === 0)}
              label={buttonLabel3}
              onClick={handleSubmitBuds}
              />
            </CardContent>
          </Card>
      </Grid>

      </Grid>
      </Container>
      </div>
      </Parallax>
      );
      } else {
        return (
          <Redirect to='/login'/>
          );
        }
    }
};