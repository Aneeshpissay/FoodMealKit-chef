import React from 'react';
import { ToggleButton, ToggleButtonGroup, Autocomplete } from '@material-ui/lab';
import { BoldText } from '../../utils/text';
import { Grid, Paper, TextField } from '@material-ui/core';
import { primary } from '../../constants/Colors';
import axios from 'axios';
import { ALL_INGREDIENTS, VEGETABLES, FRUITS } from '../../api';

export const Ingredients = () => {
  const [ingredients, setIngredients] = React.useState('All');

  const handleIngredients = (event, newIngredient) => {
    setIngredients(newIngredient);
  };
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if(ingredients === 'All') {
        axios.get(ALL_INGREDIENTS).then((res) => {
            setData(res.data);
        })
    }
    else if(ingredients === 'Vegetables') {
        axios.get(VEGETABLES).then((res) => {
            setData(res.data);
        })
    }
    else if(ingredients === 'Fruits') {
        axios.get(FRUITS).then((res) => {
            setData(res.data);
        })
    }
  }, [ingredients]);
  return (
    <div>
            <Grid container justify="center">
            <ToggleButtonGroup
            value={ingredients}
            exclusive
            onChange={handleIngredients}
            aria-label="text alignment"
            color={primary}
            >
            <ToggleButton value="All">
                <BoldText>All</BoldText>
            </ToggleButton>
            <ToggleButton value="Vegetables">
                <BoldText>Vegetables</BoldText>
            </ToggleButton>
            <ToggleButton value="Fruits">
                <BoldText>Fruits</BoldText>
            </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
        <Paper style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
        <Autocomplete
            id="ingredients"
            options={data}
            autoHighlight
            multiple
            onChange={(event, value) => console.log(value)}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
                <React.Fragment>
                <img src={option.icon} width={50} height={50} />
                {option.name}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Choose a ingredient"
                variant="outlined"
                inputProps={{
                    ...params.inputProps,
                }}
                />
            )}
            />
        </Paper>
    </div>
  );
}
