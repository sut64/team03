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
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

import { BorrowingInterface , BorrowStatusInterface} from '../model/BorrowingUI';
import { EquipmentsInterface} from '../model/EquipmentUI';
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

    buttonback: {
      margin: theme.spacing(0),
      background: '#BEBEBE',
      color: '#ffffff',
      
  },

  rightalign: {
      textAlign: 'right',
    
  },

  leftalign: {
    textAlign: 'left',
  
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


function EquipBorrowCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [equipments, setEquipments] = useState<EquipmentsInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [borrowstatuses, setBorrowstatuses] = useState<BorrowStatusInterface[]>([]);
  const [borrowing, setBorrowings] = useState<Partial<BorrowingInterface>>({});
  const staff: UserInterface = (JSON.parse(localStorage.getItem("User")|| ""));
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };


  const getEquipments = async () => {
    fetch(`${apiUrl}/listableequip`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setEquipments(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getBorrowStatus = async () => {
    fetch(`${apiUrl}/listborrowstatus`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBorrowstatuses(res.data);
        } else {
          console.log("else");
        }
      });
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
    
    const name = event.target.name as keyof typeof borrowing;
    setBorrowings({
      ...borrowing,
      [name]: event.target.value,
    });
  };


  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>
 
  ) => {
 
    const id = event.target.id as keyof typeof EquipBorrowCreate;
 
    const { value } = event.target;
 
    setBorrowings({ ...borrowing, [id]: value });
 
  };

  

function submit() {
  let data = {
      CustomerBorrowID: convertType(borrowing.CustomerBorrowID),
      StaffBorrowID : convertType(staff.ID),
      EquipmentID: convertType(borrowing.EquipmentID),
      BorrowStatusID: convertType(borrowing.BorrowStatusID),
      Borrowtime: selectedDate,
      Quantity: convertType(borrowing.Quantity) ?? "",
      Contact: borrowing.Contact ?? "",
      Comment: borrowing.Comment ?? "",
  };

  const requestOptionsPost = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`${apiUrl}/createborrowing`, requestOptionsPost)
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
    getEquipments();
    getBorrowStatus();
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
            Borrowing System
          </Typography>
  
      <br/>
      
      <Paper elevation={4} className={classes.paper0}>
      <Grid container spacing={2}>

      
      <Grid className={classes.paper2} container spacing={0} item xs={6} wrap='wrap'>
      
      <Grid item xs={12}>
         Equipment
         <form className={classes.combobox} noValidate >
          
         <Select        
                multiple
                native
                value={borrowing.EquipmentID}
                onChange={handleChange}
                inputProps={{
                  name: "EquipmentID",
                }}
                variant= "outlined"
                style  = {{ width : 510 ,minHeight : 320 }}
              >
                
                <option aria-label="None" value="" style  = {{ minHeight : 45 }}>
                  Equipment
                </option>
                {equipments.map((item: EquipmentsInterface) => (
                  <option value={item.ID} key={item.ID} 
                  style  = {{ minHeight : 45 , fontSize: 17 }}>
                    {item.Name} &ensp;&ensp;&ensp; remain : {item.Quantity}
                  </option>
                ))}
              </Select>
              <br/><Typography variant="caption" >
            *คลิ๊กEquipmentเพื่อเคลียร์ตัวเลือก
          </Typography>


      
              
    
         </form>
         
        </Grid>

          <Grid item xs={11} style  = {{  textAlign : 'right' }}>
          Quantity <br/>
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
          id="Quantity"
          value={borrowing.Quantity || ""}
          onChange={handleInputChange}
          style  = {{ width : 100 , height : 60 ,textAlign : 'right'}}
        />
      </div>
    </form>
        </div>

        
        </Grid>       
          <br/><br/>
           <Grid item xs={6} className={classes.leftalign}>
        <Button className={classes.buttonback}
              component={RouterLink}
              to="/Borrowing"
              variant="contained"
            >
              ดูประวัติ
            </Button>

        </Grid>
             

      </Grid> 
      <Divider orientation="vertical" flexItem></Divider>
      
      <Grid className={classes.paper} container spacing={3} item xs={6}>
      
        <Grid item xs={12}>
         Customer
         <form className={classes.combobox} noValidate >
          
         
        <Select        
                native
                value={borrowing.CustomerBorrowID}
                onChange={handleChange}
                inputProps={{
                  name: "CustomerBorrowID",
                }}
                defaultValue={" "}
                style  = {{ width : 300 , height : 40}}
              >
                <option aria-label="None" value="">
                  Customer
                </option>
                {users.map((item: UserInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
              
    
         </form>
        </Grid>

        <Grid item xs={6} >
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
           
        
        </Grid>

         <Grid item xs={12}>
          Contact
        <div>
        <form noValidate autoComplete="off">
      <div>
        <TextField
          id="Contact"
          variant="outlined"
          value={borrowing.Contact || ""}
          onChange={handleInputChange}
          style  = {{ width : 300 , height : 40}}
        />
      </div>
    </form>
        </div>
        </Grid>             
        
        
        <Grid item xs={12} className={classes.combobox}>
          Comment
        <div>
        <form noValidate autoComplete="off">
      <div>
        <TextField
          id="Comment"
          multiline
          rows={2}
          variant="outlined"
          value={borrowing.Comment || ""}
          onChange={handleInputChange}
        />
      </div>
    </form>
        </div>
        </Grid>


        <Grid item xs={12}>
          BorrowTime
          <form className={classes.combobox} noValidate>
      

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  id="Borrowtime"
                  name="Borrowtime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label=""
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                  style  = {{  width : 300 , height : 40}}
                />
              </MuiPickersUtilsProvider>
              
    </form>
        
        </Grid>

        <Grid item xs={12}>
         Status
         <form className={classes.combobox} noValidate >
          
         
        <Select        
                native
                value={borrowing.BorrowStatusID}
                onChange={handleChange}
                inputProps={{
                  name: "BorrowStatusID",
                }}
                style  = {{ width : 300 , height : 40}}
              >
                <option aria-label="None" value="">
                  Status
                </option>
                {borrowstatuses.map((item: BorrowStatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID} {item.Status} 
                  </option>
                ))}
              </Select>
              
    
         </form>
        </Grid>

        <Grid item xs={12} className={classes.rightalign}>
        <Button className={classes.button}
              variant="contained"
              onClick={submit}
              color = "secondary"
            >
              บันทึก
            </Button>
        </Grid>
        
      </Grid> </Grid> </Paper>

          </Container>

          
    </div>

    
  );
  
}


export default EquipBorrowCreate;