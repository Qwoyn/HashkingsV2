import React, {useContext, useState, useRef, useEffect} from "react";
import { HashkingsAPI } from "../service/HashkingsAPI";
import {StateContext} from "../App";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Parallax } from 'react-parallax';
import TradingFloor from "./TradingFloor";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: '"Jua", sans-serif',
  },
  background: {
    backgroundImage: 'url(https://i.imgur.com/ET4nTp7.jpg)',
    backgroundColor: "#DFB17B",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(3),
      backgroundColor: "Transparent",
    },
    paperTransparent: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'wrap',
      marginBottom: theme.spacing(3),
      backgroundColor: "Transparent",
    },
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#000000',
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const hashkingsApi = new HashkingsAPI();

export default function GiftSeed() {
  const classes = useStyles();
  const [seed, setSeed] = useState();
  const [to, setTo] = useState("");
  const [validatedTo, setValidatedTo] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {steemConnectAPI} = useContext(StateContext);
  const growl = useRef(null);
  const seedBackground = "https://i.imgur.com/z2A9PtG.jpg";

  return (
    <Parallax blur={1} bgImage={seedBackground} strength={1000}>
      <TradingFloor />
    </Parallax>
  );
}
