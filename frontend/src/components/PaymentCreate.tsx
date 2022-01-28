import React from 'react';
import { useEffect, useState, Component } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

import { PaymentInterface , PaymentMethodInterface } from '../model/PaymentUI';
import { FacilityInterface } from '../model/FacilityUI';
import { UserInterface } from '../model/UserUI';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      t : 2,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    paper2: {
      padding: theme.spacing(2),
      t : 10,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: '#ffffff',
    },
    paper0: {

      
    },
    text:{
      color: '#778899',
      textAlign: 'center',
    },
    textdiag:{
      
    },
    combobox: {
      '& .MuiTextField-root': {
        width: '50ch',
      },
    },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },

    datetime: {

     
      width: 500,
    },

    textbox: {
      '& .MuiTextField-root': {
        
        width: '86ch',
      },
    },

    button: {
      
        margin: theme.spacing(2),
        background: '#dd0000',
        color: '#ffffff',
        textAlign: 'right',
    },

    button2: {
      
      margin: theme.spacing(2),
      background: '#BEBEBE',
      color: '#ffffff',
      
  },

  background: {
      
    background: '#ffffff',
    maxHeight : 'auto',

},
    
    invisible: {
      visibility: "hidden"
  },
  
  }),
);

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


function PaymentCreate() {
  const classes = useStyles();
  const [addedtime, setAddedTime] = useState<Date | null>(new Date());
  const [facility, setFacility] = useState<FacilityInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [paymentmethod, setPaymentMethod] = useState<PaymentMethodInterface[]>([]);
  const [payment, setPayment] = useState<Partial<PaymentInterface>>({});
  const staff: UserInterface = (JSON.parse(localStorage.getItem("User")|| ""));
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };


  const getFacility = async () => {
    fetch(`${apiUrl}/listfacility`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setFacility(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPaymentMethod = async () => {
    fetch(`${apiUrl}/listpaymentmethod`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPaymentMethod(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getUser = async () => {
    fetch(`${apiUrl}/listcustomer`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const [value, setValue] = React.useState('Controlled');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown ;}>
  ) => {
    
    const name = event.target.name as keyof typeof payment;
    setPayment({
      ...payment,
      [name]: event.target.value,
    });
  };


  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setAddedTime(date);
  };


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>
 
  ) => {
 
    const id = event.target.id as keyof typeof PaymentCreate;
 
    const { value } = event.target;
 
    setPayment({ ...payment, [id]: value });
 
  };

  

function submit() {
  let data = {
    CustomerPaymentID: convertType(payment.CustomerPaymentID),
    StaffPaymentID : convertType(staff.ID),
      FacilityID: convertType(payment.FacilityID),
      PaymentMethodID: convertType(payment.PaymentMethodID),
      AddedTime: addedtime,
      Discount: convertType(payment.Discount) ?? "",
      Total: convertType(payment.Total) ?? "",
      Bill: payment.Bill ?? ""
  };

  const requestOptionsPost = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`${apiUrl}/paymentcreate`, requestOptionsPost)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setSuccess(true);
      } else {
        setError(true);
      }
    });
    
}

  useEffect(() => {
    getFacility();
    getPaymentMethod();
    getUser();
  }, []);

    

return (

    <div className={classes.background}>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
          {}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <br/><br/> 
      <Container maxWidth = 'lg'>
    
      <Typography variant="h5" className={classes.text}>
            Payment
  
          </Typography>
  
      <br/>
      
      <Paper elevation={4} className={classes.paper0}>
      <Grid container spacing={2}>

      
      <Grid className={classes.paper2} container spacing={0} item xs={6} wrap='wrap'>
      
      <Grid item xs={12}>
      Staff
          
          <form className={classes.combobox} noValidate autoComplete="off">
          
            
          <Select
                native
                defaultValue={0}
                variant="outlined"
                disabled
                style  = {{ width : 300 , height : 40}}
              >
                
                  <option value={0}>
                  {staff.Name}
                </option>               
          </Select>
          
   
        </form>

      Customer
         <form className={classes.combobox} noValidate >
          
         
        <Select        
                native
                value={payment.CustomerPaymentID}
                onChange={handleChange}
                inputProps={{
                  name: "CustomerPaymentID",
                }}
                style  = {{ width : 300 , height : 40}}
              >
                <option aria-label="None" value="">
                  เลือกสมาชิก
                </option>
                {users.map((item: UserInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID} {item.Name} {item.Role.Name}
                  </option>
                ))}
              </Select>
              
    
         </form>
         
        </Grid>

          <Grid item xs={9} style  = {{  textAlign : 'right' }}>
          Bill
        <div>
        <form noValidate autoComplete="off">
      <div>
        <TextField
          id="Bill"
          variant="outlined"
          value={payment.Bill || ""}
          onChange={handleInputChange}
          style  = {{ width : 300 , height : 40}}
        />
      </div>
    </form>
        </div>

        
        </Grid>       

           <Grid item xs={6}>
        <Button className={classes.button2}
              component={RouterLink}
              to="/HistoryPayment"
              variant="contained"
            >
              ดูประวัติการชำระเงิน
            </Button>

        </Grid>
             

      </Grid> 
      <Divider orientation="vertical" flexItem></Divider>
      
      <Grid className={classes.paper} container spacing={3} item xs={6}>
      
        <Grid item xs={12}>

        Facility
         <form className={classes.combobox} noValidate >
          
         
        <Select        
                native
                value={payment.FacilityID}
                onChange={handleChange}
                inputProps={{
                  name: "FacilityID",
                }}
                style  = {{ width : 300 , height : 40}}
              >
                <option aria-label="None" value="">
                  เลือกรายการจ่าย
                </option>
                {facility.map((item: FacilityInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.No} 
                  </option>
                ))}
              </Select>
              
    
         </form>


        </Grid>

         <Grid item xs={3}>
         Discount
        <div>
        <form noValidate autoComplete="off">
      <div>
        <TextField
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: { min: 1 }
          }}
          id="Discount"
          value={payment.Discount || ""}
          onChange={handleInputChange}
          style  = {{ width : 60 , height : 40}}
        />
      </div>
    </form>
        </div>
        </Grid>             
        
        
        <Grid item xs={6} className={classes.combobox}>
        Total
        <div>
        <form noValidate autoComplete="off">
      <div>
        <TextField
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: { min: 1 }
          }}
          id="Total"
          value={payment.Total || ""}
          onChange={handleInputChange}
          style  = {{ width : 60 , height : 40}}
        />
      </div>
    </form>
        </div>
        </Grid>


        <Grid item xs={12}>

        Payment Method
         <form className={classes.combobox} noValidate >
          
         <Select        
                native
                autoComplete=''
                value={payment.PaymentMethodID}
                onChange={handleChange}
                inputProps={{
                  name: "PaymentMethodID",
                }}
                style  = {{ width : 300 , height : 40}}
              >
                
                <option aria-label="None" value="">
                  เลือกช่องทางการชำระเงิน
                </option>
                {paymentmethod.map((item: PaymentMethodInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
              
    
         </form>


        </Grid>

        <Grid item xs={12}>

        AddedTime
          <form className={classes.combobox} noValidate>
      

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  id="AddedTime"
                  name="AddedTime"
                  value={addedtime}
                  onChange={handleDateChange}
                  label=""
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                  style  = {{  width : 300 , height : 40}}
                />
              </MuiPickersUtilsProvider>
              
    </form>
        </Grid>

        <Grid item xs={6}>
        <Button className={classes.button}
              variant="contained"
              onClick={submit}
              color = "secondary"
            >
              บันทึกการชำระเงิน
            </Button>
        </Grid>
        
      </Grid> </Grid> </Paper>

          </Container>

          
    </div>

    
  );
  
}


export default PaymentCreate;