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

export const SecretPage = () => {
const {username} = useContext(StateContext);
const classes = useStyles();
const isDesktop = window.innerWidth < 1000;
const [isSubmitting, setIsSubmitting] = useState(false);
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

const [asiaBundles, setAsiaQuantity] = useState([0]);
const [africaBundles, setAfricaQuantity] = useState([0]);
const [afghanistanBundles, setAfghanistanQuantity] = useState([0]);
const [jamaicaBundles, setJamaicaQuantity] = useState([0]);
const [mexicoBundles, setMexicoQuantity] = useState([0]);
const [southAmericaBundles, setSouthAmericaQuantity] = useState([0]);

const hasHiveKeychain = useHiveKeychain();

const loadPriceData = async () => {
    
  const urlAPI = 'http://45.77.121.122:3000/';
  
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

const handleSubmitAsia = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `asia_bundle`;
    const to = "hashkings";
    const amount = seedAsiaPrices.toFixed(3).toString();
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
        setSeedAsia();
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

const handleSubmitAfrica = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `africa_bundle`;
    const to = "hashkings";
    const amount = seedAfricaPrices.toFixed(3).toString();
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
        setSeedAfrica();
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

const handleSubmitAfghanistan = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `afghanistan_bundle`;
    const to = "hashkings";
    const amount = seedAfghanistanPrices.toFixed(3).toString();
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
        setSeedAfghanistan();
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

const handleSubmitJamaica = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `jamaica_bundle`;
    const to = "hashkings";
    const amount = seedJamaicaPrices.toFixed(3).toString();
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
        setSeedJamaica();
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

const handleSubmitMexico = async e => {
  e.preventDefault();
  if (username) {
    setIsSubmitting(true);

    const memo = `mexico_bundle`;
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
    setIsSubmitting(true);

    const memo = `southamerica_bundle`;
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
        setIsSubmitting(false);
        setSeedSouthAmerica();
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

let buttonLabel = "Purchase";
if (isSubmitting) buttonLabel = "Purchasing";
if (!username) buttonLabel = "Please Sign in";

if (!isDesktop) {
  if (username) {
  return(
    <Parallax blur={1} bgImage={image1} strength={500}>
    <div className={classes.root}>

      <center>
        <img src="https://i.imgur.com/LgxQQjM.jpg"></img>
      </center>
    
      <Container fixed>
      <Grid container spacing={3}>
      <Grid item xs> 
      <Card className={classes.card} raised={true}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/zLl260v.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Asia Bundle ({asiaBundles} Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                This bundle includes 1 plot in Asia, 1 random Asian Landrace Seed and a level 1 Water Tower.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b> {seedAsiaPrices} HIVE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username}
              label={buttonLabel}
              onClick={handleSubmitAsia}
              />
            </CardContent>
          </Card>
      </Grid>

        <Grid item xs>
        <Card className={classes.card} raised={true}>
        <CardMedia
              className={classes.media}
              image="https://i.imgur.com/iWJFmeF.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Africa Bundle ({africaBundles} Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
              This bundle includes 1 plot in Africa, 1 Random African Landrace Seed and a level 1 Water Tower.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b> {seedAfricaPrices} HIVE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username}
              label={buttonLabel}
              onClick={handleSubmitAfrica}
              />
            </CardContent>
          </Card>
          <br/>
        </Grid>

        <Grid item xs>
        <Card className={classes.card} raised={true}>
        <CardMedia
              className={classes.media}
              image="https://i.imgur.com/tr2MCTE.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Jamaica Bundle ({jamaicaBundles} Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
              This bundle includes 1 plot in Jamaica, 1 Random Jamaican Landrace Seed and a level 1 Water Tower.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b> {seedJamaicaPrices} HIVE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username}
              label={buttonLabel}
              onClick={handleSubmitJamaica}
              />
            </CardContent>
          </Card>
          <br/>
        </Grid>
        </Grid>
        
        <Grid container spacing={3}>
      <Grid item xs> 
      <Card className={classes.card} raised={true}>
      <CardMedia
              className={classes.media}
              image="https://i.imgur.com/JaXNvex.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>South America Bundle ({southAmericaBundles} Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
              This bundle includes 1 plot in South America, 1 Random South American Landrace Seed and a level 1 Water Tower.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b> {seedSouthAmericaPrices} HIVE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username}
              label={buttonLabel}
              onClick={handleSubmitSouthAmerica}
              />
            </CardContent>
          </Card>
      </Grid>

        <Grid item xs>
        <Card className={classes.card} raised={true}>
        <CardMedia
              className={classes.media}
              image="https://i.imgur.com/sh8hqAi.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Mexico Bundle ({mexicoBundles}  Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
              This bundle includes 1 plot in Mexico, 1 Random Mexican Landrace Seed and a level 1 Water Tower.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b> {seedMexicoPrices} HIVE</font>
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

        <Grid item xs>
        <Card className={classes.card} raised={true}>
        <CardMedia
              className={classes.media}
              image="https://i.imgur.com/dtRKgF0.png"
              title="Market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              <font color="DFB17B" className={classes.font}>Afghanistan Bundle ({afghanistanBundles} Available)</font>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}>
                This seed is part of the first round of seeds and extremely rare. 
                It can be used to make beta seeds.
              </font>
              </Typography>
              <br/>
              <br/>
              <Typography variant="body2" color="textSecondary" component="p">
              <font color="DFB17B" className={classes.font}><b>Price: </b> {seedAfghanistanPrices} HIVE</font>
              </Typography>
              <br/>
              <Button
              disabled={isSubmitting || !username}
              label={buttonLabel}
              onClick={handleSubmitAfghanistan}
              />
            </CardContent>
          </Card>
        </Grid>
    </Grid>
      
      <br/>
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
          <img src="https://i.imgur.com/gqI9Gdu.jpg"></img>
        </center>
      
        <Container fixed>
        <Grid container spacing={3}>
        <Grid item xs> 
        <Card className={classes.card} raised={true}>
        <CardMedia
                className={classes.media}
                image="https://i.imgur.com/zLl260v.png"
                title="Market"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <font color="DFB17B" className={classes.font}>Asia Bundle ({asiaBundles} Available)</font>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}>
                  This bundle includes 1 plot in Asia, 1 random Asian Landrace Seed and a level 1 Water Tower.
                </font>
                </Typography>
                <br/>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}><b>Price: </b> {seedAsiaPrices} HIVE</font>
                </Typography>
                <br/>
                <Button
                disabled={isSubmitting || !username}
                label={buttonLabel}
                onClick={handleSubmitAsia}
                />
              </CardContent>
            </Card>
        </Grid>
  
          <Grid item xs>
          <Card className={classes.card} raised={true}>
          <CardMedia
                className={classes.media}
                image="https://i.imgur.com/iWJFmeF.png"
                title="Market"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <font color="DFB17B" className={classes.font}>Africa Bundle ({africaBundles} Available)</font>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}>
                This bundle includes 1 plot in Africa, 1 Random African Landrace Seed and a level 1 Water Tower.
                </font>
                </Typography>
                <br/>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}><b>Price: </b> {seedAfricaPrices} HIVE</font>
                </Typography>
                <br/>
                <Button
                disabled={isSubmitting || !username}
                label={buttonLabel}
                onClick={handleSubmitAfrica}
                />
              </CardContent>
            </Card>
            <br/>
          </Grid>
  
          <Grid item xs>
          <Card className={classes.card} raised={true}>
          <CardMedia
                className={classes.media}
                image="https://i.imgur.com/tr2MCTE.png"
                title="Market"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <font color="DFB17B" className={classes.font}>Jamaica Bundle ({jamaicaBundles} Available)</font>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}>
                This bundle includes 1 plot in Jamaica, 1 Random Jamaican Landrace Seed and a level 1 Water Tower.
                </font>
                </Typography>
                <br/>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}><b>Price: </b> {seedJamaicaPrices} HIVE</font>
                </Typography>
                <br/>
                <Button
                disabled={isSubmitting || !username}
                label={buttonLabel}
                onClick={handleSubmitJamaica}
                />
              </CardContent>
            </Card>
            <br/>
          </Grid>
          </Grid>
          
          <Grid container spacing={3}>
        <Grid item xs> 
        <Card className={classes.card} raised={true}>
        <CardMedia
                className={classes.media}
                image="https://i.imgur.com/JaXNvex.png"
                title="Market"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <font color="DFB17B" className={classes.font}>South America Bundle ({southAmericaBundles} Available)</font>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}>
                This bundle includes 1 plot in South America, 1 Random South American Landrace Seed and a level 1 Water Tower.
                </font>
                </Typography>
                <br/>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}><b>Price: </b> {seedSouthAmericaPrices} HIVE</font>
                </Typography>
                <br/>
                <Button
                disabled={isSubmitting || !username}
                label={buttonLabel}
                onClick={handleSubmitSouthAmerica}
                />
              </CardContent>
            </Card>
        </Grid>
  
          <Grid item xs>
          <Card className={classes.card} raised={true}>
          <CardMedia
                className={classes.media}
                image="https://i.imgur.com/sh8hqAi.png"
                title="Market"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <font color="DFB17B" className={classes.font}>Mexico Bundle ({mexicoBundles}  Available)</font>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}>
                This bundle includes 1 plot in Mexico, 1 Random Mexican Landrace Seed and a level 1 Water Tower.
                </font>
                </Typography>
                <br/>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}><b>Price: </b> {seedMexicoPrices} HIVE</font>
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
  
          <Grid item xs>
          <Card className={classes.card} raised={true}>
          <CardMedia
                className={classes.media}
                image="https://i.imgur.com/dtRKgF0.png"
                title="Market"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <font color="DFB17B" className={classes.font}>Afghanistan Bundle ({afghanistanBundles} Available)</font>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}>
                  This seed is part of the first round of seeds and extremely rare. 
                  It can be used to make beta seeds.
                </font>
                </Typography>
                <br/>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                <font color="DFB17B" className={classes.font}><b>Price: </b> {seedAfghanistanPrices} HIVE</font>
                </Typography>
                <br/>
                <Button
                disabled={isSubmitting || !username}
                label={buttonLabel}
                onClick={handleSubmitAfghanistan}
                />
              </CardContent>
            </Card>
          </Grid>
      </Grid>
        
        <br/>
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