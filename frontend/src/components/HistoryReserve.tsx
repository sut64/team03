import React, {  useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from '@material-ui/core/Container';
import { format } from 'date-fns'
import { ReserveInterface } from "../model/ReserveUI";



const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {marginTop: theme.spacing(3)},
    paper: {padding: theme.spacing(3)},
    table: {minWidth: 800},
    tableSpace: {marginTop: 20},
    row: {'& > !': {borderBottom: 'unset'},},
  })
);


export default function HistoryReserve() {
    const classes = useStyles();
    const [Reserve, setReserve] = useState<ReserveInterface[]>([]);
  
    const getReserve = async() => {
      const apiUrl = "http://localhost:8080/api/ListReserve";
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",},
      };
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setReserve(res.data);
          } else {
            console.log("else");
          }
        });
    };
  
    useEffect(() => {
      getReserve();
    }, []);
  
    return (
      <div>
          
      <Container className={classes.container} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ผลการบันทึก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/CreateReserve"
              variant="contained"
              color="primary"

            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อคนจอง
                </TableCell>
                <TableCell align="center" width="10%">
                  Zone
                </TableCell>
                <TableCell align="center" width="12%">
                  Court
                </TableCell>
                <TableCell align="center" width="10%">
                  Time
                </TableCell>
                <TableCell align="center" width="12%">
                  Amount
                </TableCell>
                <TableCell align="center" width="12%">
                  Tel
                </TableCell>
                 
              </TableRow>
            </TableHead>
            <TableBody>
              {Reserve.map((item: ReserveInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.BookingTime.Court.Zone.Name}</TableCell>
                  <TableCell align="center">{item.BookingTime.Court.Name}</TableCell>
                  <TableCell align="center">{item.BookingTime.Time}</TableCell>
                  <TableCell align="center">{item.Amount}</TableCell>
                  <TableCell align="center">{item.Tel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }