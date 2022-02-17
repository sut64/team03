import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from "react-router-dom";
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ClassNames } from '@emotion/react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@material-ui/core/Button";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PaymentIcon from '@mui/icons-material/Payment';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    center: {
      margin: theme.spacing(3),
      textAlign: 'center',
      color: '#696969'
    },

    button: {
      background: '#DF1B3F',
      color: '#ffffff',
      height: '27ch',
      margin: theme.spacing(0.8),
    },

    button2: {
      background: '#DF1B3F',
      color: '#ffffff',
      height: '7ch',
      margin: theme.spacing(0.8),
    },
  }),
);



export default function Home() {
  const classes = useStyles();


  return (
    <div>
      <Container className='container' fixed >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16} >
            <Grid item xs={10} >
              <Box >
                <img src={require('./image/health-fitness-tips-weight.jfif')} width="100%" height="550" />
              </Box>
            </Grid>
            <Grid item xs={6} >

              <Typography variant="h2" sx={{ fontSize: 40, color: '#544447', textAlign: 'center' }}> SPORTS CENTER</Typography>
              <Grid container  spacing={2}  columns={6} >
              <Grid item xs={3} >
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.button}
                  component={RouterLink}
                  to="/CreateReserve"
                >
                  <Typography variant="body1"> จองสนามกีฬา &nbsp;&nbsp;</Typography>
                  <SportsSoccerIcon sx={{ fontSize: 50, color: '#ffffff' }} />
                </Button>
              </Grid>
              <Grid item xs={3} >
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.button}
                  component={RouterLink}
                  to="/HistoryEvent"
                >
                  <Typography variant="body1"> ตารางกิจกรรม &nbsp;&nbsp;</Typography>
                  <SportsMartialArtsIcon sx={{ fontSize: 50, color: '#ffffff' }} />
                </Button>
              </Grid>
              </Grid>




              <Button
                variant="contained"
                fullWidth
                className={classes.button2}
                component={RouterLink}
                to="/HistoryReserve"
              >
                <Typography variant="body1"> ประวัติการจองสนามกีฬา &nbsp;&nbsp;</Typography>
                <SportsSoccerIcon sx={{ fontSize: 35, color: '#ffffff' }} />
              </Button>

              <Button
                variant="contained"
                fullWidth
                className={classes.button2}
                component={RouterLink}
                to="/UserEquipment"
              >
                <Typography variant="body1"> อุปกรณ์สำหรับการยืม &nbsp;&nbsp;</Typography>
                <SportsBasketballIcon sx={{ fontSize: 35, color: '#ffffff' }} />
              </Button>


              <Button
                variant="contained"
                fullWidth
                className={classes.button2}
                component={RouterLink}
                to="/BorrowingforMember"
              >
                <Typography variant="body1"> ประวัติการยืมอุปกรณ์ &nbsp;&nbsp;</Typography>
                <SportsTennisIcon sx={{ fontSize: 35, color: '#ffffff' }} />
              </Button>

              <Button
                variant="contained"
                fullWidth
                className={classes.button2}
                component={RouterLink}
                to="/HistoryFacilityForMember"
              >
                <Typography variant="body1"> ข้อมูลสิทธิประโยชน์สำหรับสมาชิก &nbsp;&nbsp;</Typography>
                <AssignmentIcon sx={{ fontSize: 35, color: '#ffffff' }} />
              </Button>

              <Button
                variant="contained"
                fullWidth
                className={classes.button2}
                component={RouterLink}
                to="/PaymentforMember"
              >
                <Typography variant="body1"> ประวัติการชำระค่าบริการ &nbsp;&nbsp;</Typography>
                <PaymentIcon sx={{ fontSize: 35, color: '#ffffff' }} />
              </Button>



            </Grid>
          </Grid>
        </Box>


      </Container>

    </div>
  );

}

