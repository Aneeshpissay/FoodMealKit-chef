import React from 'react';
import { FormControl, InputLabel, OutlinedInput, makeStyles } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { bold } from '../constants/Font';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    search: {
        marginLeft: 400,
        marginRight: 400
    },
    inputLabel: {
        fontFamily: bold,
        color: orange[500],
        "&.Mui-focused": {
          color: orange[500]
        }
    }
}));

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
    backgroundColor: theme.palette.background.paper,
      "&$focused $notchedOutline": {
        borderColor: orange[500]
      },
      "&:hover $notchedOutline": {
        borderColor: orange[500]
      },
      "& $notchedOutline": {
        borderColor: orange[500]
      },
    },
    focused: {},
    notchedOutline: {},
    
}));

export const TextInput = (props) => {
    const {
        onChange,
        value,
        startAdornment,
        endAdornment,
        noClassName,
        style,
        labelName,
        multiline,
        placeholder,
        labelWidth,
        type,
        onInput
    } = props;
    const outlinedInputClasses = useOutlinedInputStyles();
    const classes = useStyles();
    return (
        <div className={noClassName ? null : classes.search} style={style}>
                <FormControl fullWidth className={noClassName ? null : classes.margin} variant="outlined">
                    <InputLabel className={classes.inputLabel} htmlFor={labelName}>{labelName}</InputLabel>
                    <OutlinedInput
                        id={labelName}
                        value={value}
                        classes={outlinedInputClasses}
                        onChange={onChange}
                        type={type}
                        onInput={onInput}
                        multiline={multiline}
                        startAdornment={startAdornment}
                        endAdornment={endAdornment}
                        labelWidth={labelWidth}
                        placeholder={placeholder}
                    />
                </FormControl>
        </div>
    )
}