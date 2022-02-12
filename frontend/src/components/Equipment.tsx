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
import { IconButton, Snackbar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { EquipmentsInterface } from "../model/EquipmentUI";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      minWidth: 1400,
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




function Equipment() {
  const classes = useStyles();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  
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



  const [ErrorMessage, setErrorMessage] = React.useState("");

  const DeleteEquipment = async (id: string | number | undefined) => {
    const apiUrl = "http://localhost:8080/DeleteEquipment";
    const requestOptions = {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
    };
  
    fetch(`${apiUrl}/${id}`, requestOptions)
    .then((response) => response.json())
    .then(
      (res) => {
        if (res.data) {
          setSuccess(true)
          setErrorMessage("")
        } 
        else { 
          setErrorMessage(res.error)
          setError(true)
        }  
        getEquipment(); 
      }
    )
  }

  useEffect(() => {
    getEquipment();
  }, []);


  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                ลบข้อมูลสำเร็จ
              </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {ErrorMessage}
              </Alert>
            </Snackbar>
            <br/><br/> 


          <Grid item xs={6}>
            <Typography
              component="h2"
              variant="h5"
              gutterBottom
              color = "primary"
            >
              อุปกรณ์กีฬา
            </Typography>
            </Grid>
          </Box>
          <Box>
            <Button className={classes.button}
              component={RouterLink}
              to="/inputEquip"
              variant="contained"
              color="primary"
            >
              เพิ่มอุปกรณ์
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tablehead }>
              <TableCell align="center" width="5%">
                  ID
                </TableCell>
              <TableCell align="left" width="12%">
                  ชื่ออุปกรณ์
                </TableCell>
                <TableCell align="center" width="10%">
                  จำนวน
                </TableCell>
                <TableCell align="left" width="10%">
                  ประเภทกีฬา
                </TableCell>
                <TableCell align="left" width="10%">
                  บริษัทที่ผลิต
                </TableCell>
                <TableCell align="center" width="12%">
                  สถานะอุปกรณ์
                </TableCell>
                <TableCell align="left" width="10%">
                  ผู้ลงทะเบียน
                </TableCell>
                <TableCell align="center" width="12%">
                  วันที่นำเข้าอุปกรณ์
                </TableCell>
                <TableCell align="center" width="8%">
                  ลบอุปกรณ์
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipments.map((item: EquipmentsInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="left">{item.Name}</TableCell>
                  <TableCell align="center">{item.Quantity}</TableCell>
                  <TableCell align="left">{item.SportType.Type}</TableCell>
                  <TableCell align="left">{item.Company.Company}</TableCell>
                  <TableCell align="center">{item.RoleItem.Role}</TableCell>
                  <TableCell align="left">{item.EquipmentStaff.Name}</TableCell>
                  <TableCell align="center">{format((new Date(item.InputDate)), 'dd MMMM yyyy')}</TableCell>
                  <TableCell align="center"> 
                  
                  <IconButton  aria-label="delete" onClick={() => DeleteEquipment(item.ID)} > <DeleteIcon /> </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }

export default Equipment;