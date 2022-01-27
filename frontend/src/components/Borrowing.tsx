import React, { useEffect } from "react";

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

import { BorrowingInterface } from "../model/BorrowingUI";

import moment from 'moment';



 

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


 })

);

 

function EquipBorrow() {

 const classes = useStyles();

 const [borrowings, setborrowings] = React.useState<BorrowingInterface[]>([]);

 

 const getฺBorrowings = async () => {

   const apiUrl = "http://localhost:8080/listborrowings";

   const requestOptions = {

     method: "GET",

     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
    },

   };

 

   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       console.log(res.data);

       if (res.data) {

        setborrowings(res.data);

       } else {

         console.log("else");

       }

     });

 };

 

 useEffect(() => {

  getฺBorrowings();

 }, []);

 

 return (

   <div className={classes.background}>

     <Container className={classes.container} maxWidth="xl">

       <Box display="flex">

         <Box flexGrow={3}>

           <Typography
             className={classes.headtext}
             component="h1"
             variant="h4"
             color="primary"
             gutterBottom
           >

             Borrowing System

           </Typography>

         </Box>

         <Box>

           <Button className={classes.button}
             component={RouterLink}
             to="/BorrowingCreate"
             variant="contained"
           >

             Borrow

           </Button>

         </Box>

       </Box>

       <TableContainer component={Paper} className={classes.tableSpace} >

         <Table className={classes.table} aria-label="a dense table"  size="small">

           <TableHead>

             <TableRow className={classes.tablehead}>

               <TableCell align="center" width="5%">

                 ID

               </TableCell>

               <TableCell align="left" width="8%">

                 Borrower

               </TableCell>

               <TableCell align="right" width="8%">

                 Equipment

               </TableCell>

               <TableCell align="right" width="7%">

                 Quantity

               </TableCell>

               <TableCell align="right" width="8%">

                 Contact

               </TableCell>

               <TableCell align="right" width="10%">

                 Borrow Time

               </TableCell>

               <TableCell align="right" width="8%">

                 Status

               </TableCell>

               <TableCell align="right" width="13%">

                 Comment

               </TableCell>

               <TableCell align="right" width="9%">

                 Staff

               </TableCell>

             </TableRow>

           </TableHead>

           <TableBody >

             {borrowings.map((borrow: BorrowingInterface) => (

               <TableRow key={borrow.ID}>

                 <TableCell align="center">{borrow.ID}</TableCell>

                 <TableCell align="left" size="medium">{borrow.CustomerBorrow.Name}</TableCell>

                 <TableCell align="right" size="medium">{borrow.Equipment.Name}</TableCell>

                 <TableCell align="right" size="medium">{borrow.Quantity}</TableCell>

                 <TableCell align="right" size="medium">{borrow.Contact}</TableCell>

                 <TableCell align="right">{moment(borrow.Borrowtime).format("HH:mm DD/MM/YYYY")}</TableCell>

                 <TableCell align="right" size="medium">{borrow.BorrowStatus.Status}</TableCell>
                 
                 <TableCell align="right">{borrow.Comment}</TableCell>

                 <TableCell align="right">{borrow.StaffBorrow.Name}</TableCell>

               </TableRow>

             ))}

           </TableBody>

         </Table>

       </TableContainer>

     </Container>

   </div>

 );

}

 

export default EquipBorrow;