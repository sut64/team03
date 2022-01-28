import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { format } from 'date-fns'
import Grid from '@material-ui/core/Grid';

import { EquipmentsInterface } from "../model/EquipmentUI";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      minWidth: 1100,
    },

    table: {
      minWidth: 1000,
    },

    tablehead: {

        background: '#ada9a9',
        color: '#ffffff',
    
      },

    button: {

      margin: theme.spacing(2),
      background: '#DF1B3F',
      color: '#ffffff',
  },
    tableSpace: {
      marginTop: 20,
    },

    color:{
      background: 'linear-gradient(45deg, #F38D98 30%, #E0BBE4 90%)',
      
  },
  })
);




function UserEquipment() {
  const classes = useStyles();

  
  const [equipments, setEquipments] = useState<EquipmentsInterface[]>([]);
  const apiUrl = "http://localhost:8080/ListEquipment";
  const requestOptions = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",},
  };

  const getEquipment = async () => {
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setEquipments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getEquipment();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
          <Grid item xs={6}>
            <Typography
              component="h2"
              variant="h5"
              gutterBottom
              color = "primary"
            >
              อุปกรณ์สำหรับการยืม
            </Typography>
            </Grid>
          </Box>
          
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tablehead } >
            
              <TableCell align="center" width="8%">
                  ชื่ออุปกรณ์
                </TableCell>
                <TableCell align="center" width="5%">
                  คงเหลือ
                </TableCell>
                <TableCell align="center" width="8%">
                  ประเภทกีฬา
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {equipments.map((item: EquipmentsInterface) => (
                <TableRow key={item.ID}>
                
                  <TableCell align="center">{item.Name}</TableCell>
                  <TableCell align="center">{item.Quantity}</TableCell>
                  <TableCell align="center">{item.SportType.Type}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }

export default UserEquipment;