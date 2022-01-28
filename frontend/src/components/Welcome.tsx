import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ClassNames } from '@emotion/react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@material-ui/core/Button";
import { Box } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    center: {
      margin: theme.spacing(3),
      textAlign: 'left',
      color: '#696969'
    },

    button: {
      background: 'linear-gradient(20deg, #FFAACA 25%, #FFDD96 90%)',
      color: '#ffffff',
      height: '20ch',
      width: '30ch',
    },
  }),
);



export default function Home() {
  const classes = useStyles();


    return (
      <div className={classes.center}>
      
      <CssBaseline />
      <Container fixed maxWidth='md'>
      <Grid item xs={12}>
        <Box >
        <img src={require('./image/health-fitness-tips-weight.jfif')}  width="1000" height="600" />
        </Box>
        
          
        </Grid>
      <Grid item xs={12}><Typography variant="h2" sx={{ fontSize: 50 , color : '#BEBEBE',textAlign : 'center' }}> SPORTS CENTER</Typography></Grid>
        

      </Container>

      <Grid>

      

      </Grid>
       
      </div>
    );
  
}

