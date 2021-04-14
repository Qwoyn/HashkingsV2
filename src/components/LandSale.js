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
    backgroundColor: "#095938",
  },
  media: {
    height: 300,
    width: 270,
  },
  mediaTwo: {
    height: 100,
    width: 270,
  },
}));

export const LandSale = () => {
const {username} = useContext(StateContext);
const classes = useStyles();
const isDesktop = window.innerWidth < 1000;
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSubmitting1, setIsSubmitting1] = useState(false);
const image1 = "https://i.imgur.com/5SKbll8.png";

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

  var seedAsiaPrice = pricedata.stats.prices.land.price;
  var seedAfricaPrice = pricedata.stats.prices.land.price;
  var seedAfghanistanPrice = pricedata.stats.prices.land.price;
  var seedJamaicaPrice = pricedata.stats.prices.land.price;
  var seedMexicoPrice = pricedata.stats.prices.land.mexico.price;
  var seedSouthAmericaPrice = pricedata.stats.prices.land.southAmerica.price;

  var asiaBundles = pricedata.stats.supply.land.asia;
  var africaBundles = pricedata.stats.supply.land.africa;
  var afghanistanBundles = pricedata.stats.supply.land.afghanistan;
  var jamaicaBundles = pricedata.stats.supply.land.jamaica;
  var mexicoBundles = pricedata.stats.supply.land.mexico;
  var southAmericaBundles = pricedata.stats.supply.land.southAmerica;

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

const handleSubmitMexico = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `mexico`;
    const to = "hashkings";
    const amount = seedMexicoPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting(false);
        setSeedMexico();
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

const handleSubmitSouthAmerica = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting1(true);

    const memo = `southAmerica`;
    const to = "hashkings";
    const amount = seedSouthAmericaPrices.toFixed(3).toString();
    const currency = "HIVE";

    if (hasHiveKeychain()) {
      const hive_keychain = window.hive_keychain;
      try {
        await new Promise((resolve, reject) => {
          return hive_keychain.requestTransfer(
            username,
            to,
            amount,
            memo,
            currency,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            },
            true
          );
        });
        setIsSubmitting1(false);
        setSeedSouthAmerica();
      } catch {
        setIsSubmitting1(false);
      }
    } else {
      window.location.href = sign(
        "transfer",
        {
          to,
          from: username,
          amount: `${amount} ${currency}`,
          memo
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/`
          : "https://localhost:3000/"
      );
    }
  }
};

let buttonLabel = "Purchase";
if (isSubmitting) buttonLabel = "Purchasing";

let buttonLabel1 = "Purchase";
if (isSubmitting1) buttonLabel1 = "Purchasing";

if (!username) buttonLabel = "Please Sign in";


  return(
    <Parallax blur={1} bgImage={image1} strength={500}>
    <div className={classes.root}>
    <br/>
    <br/>
    <br/>
      <Container fixed>        
      <Grid container spacing={3}>

      <Grid item xs> 
      <Card className={classes.card} raised={true}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/i4z0B31.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="black" className={classes.font}>South America Plot ({southAmericaBundles} Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="black" className={classes.font}>
              Purchase 1 plot NFT in South America.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="black" className={classes.font}><b>Price: </b> {seedSouthAmericaPrices} HIVE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting1 || !username}
              label={buttonLabel1}
              onClick={handleSubmitSouthAmerica}
              />
            </CardContent>
          </Card>
      </Grid>

        <Grid item xs>
        <Card className={classes.card} raised={true}>
        <CardMedia
              className={classes.media}
              image="https://i.imgur.com/OlrsNST.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="black" className={classes.font}>Mexico Plot ({mexicoBundles}  Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="black" className={classes.font}>
              Purchase 1 plot NFT in Mexico.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="black" className={classes.font}><b>Price: </b> {seedMexicoPrices} HIVE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username}
              label={buttonLabel}
              onClick={handleSubmitMexico}
              />
            </CardContent>
          </Card>
        </Grid>

        
    </Grid>
      
      <br/>
      </Container>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </Parallax>
  );

};

