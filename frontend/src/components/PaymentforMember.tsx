import React, { Fragment, useEffect, useState } from "react";
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
import moment from 'moment';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import { format } from 'date-fns'

import { PaymentInterface } from "../model/PaymentUI";
import { UserInterface } from "../model/UserUI";

const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   container: {marginTop: theme.spacing(2)},

   table: { 
     minWidth: 620,
     border: 1,
    },

   tableSpace: {
     marginTop: 20 , 
     maxHeight: 580 ,
     border: 1 ,
     m: 1,
     borderColor: 'text.primary',
    },

   button: {
      
    margin: theme.spacing(2),
    background: '#dd0000',
    color: '#ffffff',
},

  background: {

    background: '#ffffff',
    maxHeight : 'auto',

  },

  tablehead: {

    background: '#ada9a9',
    color: '#ffffff',

  },

  headtext: {

    marginTop: 20 ,
    color: '#939393',
    textAlign: 'center',
    fontStyle: 'bold'

  },

  textmember: {

    marginTop: 20 ,
    color: '#666666',
    textAlign: 'left',

  },



 })

);

 

function PaymentMember() {

 const classes = useStyles();

 const [payment, setPayments] = React.useState<PaymentInterface[]>([]);
 const member: UserInterface = (JSON.parse(localStorage.getItem("User")|| ""));



 const getฺPayments = async (id : string | number | undefined |unknown) => {
  const apiUrl = "http://localhost:8080";
   const requestOptions = {
     method: "GET",
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
    },
   };


  fetch(`${apiUrl}/listpaymentbyuser/${id}`, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       console.log(res.data);
       if (res.data) {
        setPayments(res.data);
       } else {
         console.log("else");
       }
     });

 };

 

 useEffect(() => {

  getฺPayments(member.ID);

 }, []);

 

 return (

   <div className={classes.background}>

     <Container className={classes.container} maxWidth="lg">

       <Box display="flex">

         <Box flexGrow={3}>

           <Typography
             className={classes.headtext}
             component="h1"
             variant="h4"
             color="primary"
             gutterBottom
           >

             ประวัติการชำระค่าบริการ

           </Typography>



         </Box>

         <Box>

         </Box>

       </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="15%">
                  สมาชิก
                </TableCell>
                <TableCell align="center" width="10%">
                  เลขที่ใบเสร็จ
                </TableCell>
                <TableCell align="center" width="10%">
                  รายการจ่าย
                </TableCell>
                <TableCell align="center" width="10%">
                  ส่วนลด
                </TableCell>
                <TableCell align="center" width="10%">
                  ยอดรวม
                </TableCell>
                <TableCell align="center" width="15%">
                  ช่องทางการชำระเงิน
                </TableCell>
                <TableCell align="center" width="10%">
                  หมายเหตุ
                </TableCell>
                <TableCell align="center" width="15%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payment.map((item: PaymentInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.CustomerPayment.Name}</TableCell>
                  <TableCell align="center">{item.Bill}</TableCell>
                  <TableCell align="center">{item.Facility.No}</TableCell>
                  <TableCell align="center">{item.Discount}</TableCell>
                  <TableCell align="center">{item.Total}</TableCell>
                  <TableCell align="center">{item.PaymentMethod.Name}</TableCell>
                  <TableCell align="center">{item.Note}</TableCell>
                  <TableCell align="center">{format((new Date(item.AddedTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }

    export default PaymentMember;