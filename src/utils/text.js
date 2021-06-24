import { Typography, withStyles } from "@material-ui/core";
import { bold, light, medium } from '../constants/Font';

export const BoldText = withStyles((theme) => ({
    root: {
      fontFamily: bold,
      textTransform: 'capitalize',
    },
}))(Typography);

export const LightText = withStyles((theme) => ({
    root: {
      fontFamily: light,
    },
}))(Typography);

export const MediumText = withStyles((theme) => ({
    root: {
      fontFamily: medium,
      textTransform: 'capitalize',
    },
}))(Typography);