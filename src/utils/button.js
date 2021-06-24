import { Button, withStyles } from "@material-ui/core";
import { primary, white } from '../constants/Colors';
import { bold } from '../constants/Font';

export const OutlinedButton = withStyles((theme) => ({
    root: {
      color: primary,
      borderColor: primary,
      borderRadius: 20,
      fontFamily: bold,
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        borderColor: primary
      },
    },
}))(Button);

export const ContainedButton = withStyles((theme) => ({
  root: {
    color: white,
    borderColor: primary,
    borderRadius: 20,
    fontFamily: bold,
    textTransform: 'capitalize',
    backgroundColor: primary,
    '&:hover': {
      backgroundColor: primary,
      borderColor: primary,
      color: white
    },
  },
}))(Button);