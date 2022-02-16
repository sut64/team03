import { useEffect, useState, Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { BorrowingInterface , BorrowStatusInterface } from "../model/BorrowingUI";
import { UserInterface } from '../model/UserUI';
import moment from 'moment';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const useStyles = makeStyles((theme: Theme) =>

 createStyles({

   container: {marginTop: theme.spacing(2),overflow: "hidden",},

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

    textContainer: {
      whiteSpace: "normal",
      textOverflow: "ellipsis",
      width: "200px",
      display: "block",
      overflow: "hidden"
    },

   button: {
      
    margin: theme.spacing(2),
    background: '#dd0000',
    color: '#ffffff',
},

  selectuser: {
    margin: theme.spacing(2),
},

  background: {
    background: '#ffffff',
    maxHeight : 'auto',
  },

  tablehead: {
    background: '#43326b',
    color: '#ffffff',
  },


  borrowing: {
    color: '#FFB90F',
    fontWeight: 600,
  },

  finished: {
    color: '#32CD32',
    fontWeight: 600,
  },

  missed: {
    color: '#FF4500',
    fontWeight: 600,
  },

  headtext: {

    marginTop: 20 ,
    color: '#939393',
    textAlign: 'center',
    fontStyle: 'bold'

  },


 })

);

interface SearchInterface {
  Status: string,
  Customer: string,
}

 

function EquipBorrow() {

 const classes = useStyles();

 const [borrowings, setborrowings] = useState<BorrowingInterface[]>([]);
 const [users, setUsers] = useState<UserInterface[]>([]);
 const [borrowstatuses, setBorrowstatuses] = useState<BorrowStatusInterface[]>([]);
 const [search, setSearch] = useState<Partial<SearchInterface>>({});

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


 const apiUrl = "http://localhost:8080";
 const requestOptions = {
   method: "GET",
   headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json",
   },
 };

 const getUser = async () => {
   fetch(`${apiUrl}/users`, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       if (res.data) {
         setUsers(res.data);
       } else {
         console.log("else");
       }
     });
    };

    const getBorrowStatus = async () => {
      fetch(`${apiUrl}/listbackborrowstatus`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setBorrowstatuses(res.data);
          } else {
            console.log("else");
          }
        });
    };
     
  const getBorrowByUser = async (id : string | number | undefined |unknown) => {
    fetch(`${apiUrl}/listborrowbyuser/${id}`, requestOptions)
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

  const getBorrowByStatus = async (id : string | number | undefined |unknown) => {
    fetch(`${apiUrl}/listborrowbystatus/${id}`, requestOptions)
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

    const getฺBorrowings= async () => {
      fetch(`${apiUrl}/listborrowings`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setborrowings(res.data);
          } else {
            console.log("else");
          }
        });
  
 };

 const handleUserChange = (
  event: React.ChangeEvent<{ name?: string; value: unknown ;}>
) => {

  const name = event.target.name as keyof typeof search;
    setSearch({
      ...search,
      [name]: event.target.value,
    });

  const id = event.target.value;
  
  if(id == "") {
    getฺBorrowings();
  }
  else {
    getBorrowByUser(id);
  }

  setSearch({
    Status: "",
  });
  
};

const handleStatusChange = (
  event: React.ChangeEvent<{ name?: string; value: unknown ;}>
) => {

  const name = event.target.name as keyof typeof search;
    setSearch({
      ...search,
      [name]: event.target.value,
    });

  const id = event.target.value;

  if(id == "") {
    getฺBorrowings();
  }
  else {
    getBorrowByStatus(id);
  }

  setSearch({
    Customer: "",
  });

};
  
function Update(id : string | number | undefined |unknown) {
  let data = {
      ID : id
  };


  const requestOptionsPost = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`${apiUrl}/updateborrow/${id}`, requestOptionsPost)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log("อัพเดทได้")
        setSuccess(true);
      } else {
        console.log("อัพเดทไม่ได้")
        setError(true);
      }
    });
    
    window.location.reload();
}

const [opendia, setOpenDia] = useState(false);
const handleClickOpenDia = () => {
  setOpenDia(true);
};
const handleCloseDia = () => {
  setOpenDia(false);
};

const [opencom, setOpenCom] = useState(false);
const handleClickOpenComment = () => {
  setOpenCom(true);
};
const handleCloseComment = () => {
  setOpenCom(false);
};




 useEffect(() => {

  getฺBorrowings();
  getUser();
  getBorrowStatus();

 }, []);

 

 return (

   <div className={classes.background}>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          คืนอุปกรณ์สำเร็จ
          {}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
         คืนอุปกรณ์ไม่สำเร็จ
        </Alert>
      </Snackbar>

     <Container className={classes.container} maxWidth="xl">

       <Box display="flex">

         <Box flexGrow={3}>
      
           <Typography
             className={classes.headtext}
             component="h1"
             variant="h5"
             color="primary"
             gutterBottom
           >

             ข้อมูลการยืมอุปกรณ์

           </Typography>

         </Box>


        <Select className={classes.selectuser}       
                native
                onChange={handleStatusChange}
                value={search.Status}
                inputProps={{
                  name: "Status",
                }}
                defaultValue={" "}
                style  = {{ width : 200 , height : 40}}
              >
                <option aria-label="None" value="">
                  สถานะ
                </option>
                {borrowstatuses.map((item: BorrowStatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Status}
                  </option>
                ))}
              </Select>

              <Select className={classes.selectuser}       
                native
                onChange={handleUserChange}
                value={search.Customer}
                inputProps={{
                  name: "Customer",
                }}
                defaultValue={" "}
                style  = {{ width : 200 , height : 40}}
              >
                <option aria-label="None" value="">
                  สมาชิก
                </option>
                {users.map((item: UserInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>

         <Box>


           <Button className={classes.button}
             component={RouterLink}
             to="/BorrowingCreate"
             variant="contained"
           >
             ยืมอุปกรณ์
           </Button>

         </Box>

       </Box>

       <TableContainer component={Paper} className={classes.tableSpace} >

         <Table className={classes.table} aria-label="simple table" size="small">

           <TableHead>

             <TableRow className={classes.tablehead}>

               <TableCell align="center" width="5%" className={classes.tablehead}>

                 ID

               </TableCell>

               <TableCell align="left" width="8%" className={classes.tablehead}>

                 สมาชิก

               </TableCell>

               <TableCell align="right" width="8%" className={classes.tablehead}>

                 อุปกรณ์

               </TableCell>

               <TableCell align="right" width="7%" className={classes.tablehead}>

                 จำนวน

               </TableCell>

               <TableCell align="right" width="9%" className={classes.tablehead}>

                 เบอร์ติดต่อ

               </TableCell>

               <TableCell align="right" width="11%" className={classes.tablehead}>

                 เวลายืม

               </TableCell>

               <TableCell align="right" width="10%" className={classes.tablehead}>

                 เวลาคืน

               </TableCell>


               <TableCell align="right" width="8%" className={classes.tablehead}>

                 หมายเหตุ

               </TableCell>

               <TableCell align="right" width="8%" className={classes.tablehead}>

                 ผู้ทำรายการ

               </TableCell>

               <TableCell align="center" width="8%" className={classes.tablehead}>

                 สถานะ

               </TableCell>

               <TableCell align="right" width="6%" className={classes.tablehead}>

                 คืนอุปกรณ์

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

                 <TableCell align="right">
                 {borrow.BorrowStatus?.Status === 'สำเร็จ' && ( <>

                   {moment(borrow.Backtime).format("HH:mm DD/MM/YYYY")} </> )} </TableCell>


                <TableCell align="right">{borrow.Comment}</TableCell>

                
                <TableCell align="right">{borrow.StaffBorrow.Name}</TableCell>
                   
                  {borrow.BorrowStatus?.Status === 'กำลังยืม' && ( <> 
                  <TableCell align="center" size="medium" className={classes.borrowing}>
                    {borrow.BorrowStatus.Status}</TableCell> </> )}

                    {borrow.BorrowStatus?.Status === 'สำเร็จ' && ( <> 
                  <TableCell align="center" size="medium" className={classes.finished}>
                    {borrow.BorrowStatus.Status}</TableCell> </> )}
                 
                    {borrow.BorrowStatus?.Status === 'เสียหาย' && ( <> 
                  <TableCell align="center" size="medium" className={classes.missed}>
                    {borrow.BorrowStatus.Status}</TableCell> </> )}

                 <TableCell align="right"> 
                 
                 {borrow.BorrowStatus?.Status === 'กำลังยืม' && ( <>

                  <IconButton  >
                    <ArrowForwardIcon sx={{ fontSize: 30 , color : '#dd0000' }} onClick={() => Update(borrow.ID)}/> </IconButton>
                 </> )}
           </TableCell>
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