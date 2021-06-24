import { Grid, Paper, Divider } from '@material-ui/core';
import React from 'react';
import { OutlinedButton } from '../../utils/button';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { BoldText, LightText, MediumText } from '../../utils/text';
import { grey, primary } from '../../constants/Colors';
import { Video } from '../../utils/video';
import StopIcon from '@material-ui/icons/Stop';

const RecipeView = () => {
    const [watching, setWatching] = React.useState(false);
    const data = [ {
        "name": "Azuki Bean",
        "icon": "https://cdn.iconscout.com/icon/premium/png-512-thumb/azuki-beans-3418892-2850459.png"
      },
      {
        "name": "Basil",
        "icon": "https://cdn.iconscout.com/icon/premium/png-256-thumb/basil-3138588-2609955.png"
      },
      {
        "name": "Beet",
        "icon": "https://cdn.iconscout.com/icon/premium/png-512-thumb/beet-3138501-2609880.png"
      },
      {
        "name": "Black Bean",
        "icon": "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/289/289934/black-beans.jpg?w=1155&h=982"
      },
      {
        "name": "Black-Eyed Pea",
        "icon": "https://images-na.ssl-images-amazon.com/images/I/61E6hkjSoeL._SL1160_.jpg"
      }];
      const prep = ['In a medium pot over medium heat, heat 1 tablespoon oil. Add garlic and cook until fragrant, 1 minute more. Add tomato paste and stir to coat onion and garlic. Add ground beef and cook, breaking up meat with a wooden spoon, until no longer pink, 6 minutes. Drain fat.', 'In a medium pot over medium heat, heat 1 tablespoon oil. Add onion and cook until soft, 5 minutes. Add garlic and cook until fragrant, 1 minute more. Add tomato paste and stir to coat onion and garlic. Add ground beef and cook, breaking up meat with a wooden spoon, until no longer pink, 6 minutes. Drain fat.', 'In a medium pot over medium heat, heat 1 tablespoon oil. Add onion and cook until soft, 5 minutes. Add garlic and cook until fragrant, 1 minute more. Add tomato paste and stir to coat onion and garlic. Add ground beef and cook, breaking up meat with a wooden spoon, until no longer pink, 6 minutes. Drain fat.']
    return (
        <Grid container>
            {watching ? 
                <Grid container justify="center">
                    <Video url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
                </Grid>
            : 
            <Grid container justify="center">
                <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872" alt="" />
            </Grid>}
            <Paper>
                <Grid container justify="center" style={{marginTop: 10}}>
                    <OutlinedButton variant="outlined" color="secondary" startIcon={watching ? <StopIcon /> : <PlayArrowIcon />} onClick={() => setWatching(!watching)}>
                        {watching ? 'Stop Watching' : 'Watch Video'}
                    </OutlinedButton>
                </Grid>
                <Grid container>
                    <BoldText style={{marginLeft: 10, marginTop: 10, fontSize: 20}}>Paneer Butter Masala</BoldText>
                    <OutlinedButton style={{marginRight: 10, marginTop: 10, marginLeft: 'auto'}} variant="outlined" color="secondary" startIcon={<PrintIcon />}>
                        Print
                    </OutlinedButton>
                    <OutlinedButton style={{marginRight: 10, marginTop: 10}} variant="outlined" color="secondary" startIcon={<ShareIcon />}>
                        Share
                    </OutlinedButton>
                </Grid>
                <LightText style={{marginTop: 20, marginLeft: 10}}>This heavenly dish is an all time favourite north indian dish which is nothing but soft paneer dipped in a rich, sweet,creamy tomato based gravy with a subtle blend of spices.</LightText>
                <Divider style={{marginTop: 10, marginLeft: 10, marginRight: 10}} />
                <BoldText style={{marginTop: 10, marginLeft: 10, fontSize: 18}}>
                    Ingredients
                </BoldText>
                <Grid style={{marginTop: 10}}>
                {data.map((ingredients, index) => (
                    <Grid container key={index} direction="row" justify="flex-end" style={{marginLeft: 10, paddingRight: 5, paddingLeft: 5}}>
                        <Grid container direction="row">
                            <img src={ingredients.icon} style={{width: 35, height: 35}} alt={ingredients.name} />
                            <BoldText style={{marginLeft: 10, alignSelf: 'center'}}>{ingredients.name}</BoldText>
                        </Grid>
                        <MediumText style={{alignSelf: 'center', marginRight: 10, backgroundColor: primary, color: grey, borderRadius: 5, padding: 5, marginTop: -30}}>1 cup</MediumText>
                    </Grid>
                ))}
            </Grid>
            <Divider style={{marginTop: 10, marginLeft: 10, marginRight: 10}} />
            <BoldText style={{marginTop: 10, marginLeft: 10, fontSize: 18}}>
                Preparation
            </BoldText>
            <Grid container>
            {prep.map((preparations, index) => (
                <Grid container direction="column" style={{ backgroundColor: primary, padding: 10, borderRadius: 10, margin: 10}} key={index}>
                    <BoldText style={{marginBottom: 10, fontSize: 20}}>Step {index + 1}</BoldText>
                    <MediumText style={{marginBottom: 10}}>{preparations}</MediumText>
                </Grid>
            ))}
            </Grid>
            </Paper>
        </Grid>
    )
};

export default RecipeView;