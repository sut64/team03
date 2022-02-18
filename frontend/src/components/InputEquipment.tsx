import React, { ChangeEvent, useEffect, useState} from 'react';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker} from '@material-ui/pickers';

import { EquipmentsInterface } from "../model/EquipmentUI";
import { SportTypesInterface } from "../model/EquipmentUI";
import { CompaniesInterface } from "../model/EquipmentUI";
import { RoleItemsInterface } from "../model/EquipmentUI";
import { UserInterface } from "../model/UserUI";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    
    },
    container: { marginTop: theme.spacing(2) },
    combobox: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '50ch',
      },
    },

    textbox: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '50ch',
      },
    },
  
  }),
);

export default function EquipmentInput() {

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [equipment, setEquipment] = useState<Partial<EquipmentsInterface>>({});
  
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
    const name = event.target.name as keyof typeof equipment;
    setEquipment({...equipment, [name]: event.target.value,});
  }; 


  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };


  const EquipmentStaff: UserInterface = (JSON.parse(localStorage.getItem("User")|| ""));

  const [companies, setCompanies] = useState<CompaniesInterface[]>([]);

  const getCompany = async() => {
    const apiUrl = "http://localhost:8080/ListCompany";
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if(res.data) {
          setCompanies(res.data)
        } else {
          console.log("else")
        }
      });
  }



  const [sporttypes, setSportTypes] = useState<SportTypesInterface[]>([]);

  const getSportType = async() => {
    const apiUrl = "http://localhost:8080/ListSportType";
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if(res.data) {
          setSportTypes(res.data)
        } else {
          console.log("else")
        }
      });
  }


  const [roleitems, setRoleItems] = useState<RoleItemsInterface[]>([]);

  const getRoleItem = async() => {
    const apiUrl = "http://localhost:8080/ListRoleItem";
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if(res.data) {
          setRoleItems(res.data)
        } else {
          console.log("else")
        }
      });
  }


  useEffect(() => {
   getCompany();
   getSportType();
   getRoleItem();
  
 }, []);


  const [ErrorMessage, setErrorMessage] = React.useState<String>();

  const submit = () => {
    let data = {
      Name: equipment.Name ?? "",
      Quantity: typeof equipment.Quantity === "string"? parseInt(equipment.Quantity): equipment.Quantity,
      InputDate: selectedDate,

      SportTypeID: equipment.SportTypeID,
      CompanyID: equipment.CompanyID,
      RoleItemID: equipment.RoleItemID,
      EquipmentStaffID: EquipmentStaff.ID,
    
    };

    const apiUrl = "http://localhost:8080/InputEquipment";
      const requestOptionsPost = {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",},
        body: JSON.stringify(data),
      };

    fetch(apiUrl, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true)
          setErrorMessage("")
        } 
        else { 
          if (res.error == "UNIQUE constraint failed: equipment.name") {
            setErrorMessage("ชื่ออุปกรณ์ซ้ำ")
          }else {
            setErrorMessage(res.error)
          }
          setError(true)
        }
      });
  }


  return (

    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                บันทึกข้อมูลสำเร็จ
              </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {ErrorMessage}
              </Alert>
            </Snackbar>
            <br/><br/> 

            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom>
                เพิ่มอุปกรณ์กีฬา
            </Typography>

          </Box>
        </Box>

        <Divider />

                <Grid container spacing={5}>

                    <Grid item xs={6}>
                        <p>ชื่ออุปกรณ์</p>
                        <TextField 
                        id="Name" 
                        type="string"
                        inputProps={{name:"Name"}}
                        variant="outlined" 
                        value={equipment.Name ||""}
                        onChange={handleChange}                      
                        fullWidth
                        />
                    </Grid>


                    <Grid item xs={6}>
                    <p>จำนวน</p>
                        <TextField 
                        type ="number"           
                        InputProps={{
                          name: "Quantity", inputProps: { min: 1 }, 
                        }}
                        id="Quantity" 
                        variant="outlined" 
                        value={equipment.Quantity ||""}
                        onChange={handleChange}                      
                        fullWidth/>
                    </Grid>


                    <Grid item xs={6}>
                        <p>ประเภทกีฬา</p>
                        <Select variant="outlined"                         
                            value={equipment.SportTypeID}
                            inputProps={{name: "SportTypeID"}}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value={0} key={0} disabled >กรุณาเลือกประเภทกีฬา</MenuItem>
                            {sporttypes.map((item: SportTypesInterface) => (
                            <MenuItem value={item.ID} key={item.ID}>{item.Type}</MenuItem>))}
                        </Select>
                    </Grid>



                    <Grid item xs={6}>
                        <p>บริษัทที่ผลิต</p>
                        <Select variant="outlined"                         
                            value={equipment.CompanyID}
                            inputProps={{name: "CompanyID"}}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value={0} key={0} disabled >กรุณาเลือกบริษัทที่ผลิต</MenuItem>
                            {companies.map((item: CompaniesInterface) => (
                            <MenuItem value={item.ID} key={item.ID}>{item.Company}</MenuItem>))}
                        </Select>
                    </Grid>



                    <Grid item xs={6}>
                        <p>สถานะอุปกรณ์</p>
                        <Select variant="outlined"                         
                            value={equipment.RoleItemID}
                            inputProps={{name: "RoleItemID"}}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value={0} key={0} disabled >กรุณาเลือกสถานะอุปกรณ์</MenuItem>
                            {roleitems.map((item: RoleItemsInterface) => (
                            <MenuItem value={item.ID} key={item.ID}>{item.Role}</MenuItem>))}
                        </Select>
                    </Grid>



                    <Grid item xs={6}>
                        <p>เจ้าหน้าที่</p>
                        <Select variant="outlined"                         
                            disabled
                            defaultValue={0}
                            fullWidth
                        >
                            <MenuItem value={0} >{EquipmentStaff.Name}</MenuItem>
                        </Select>
                    </Grid>


                    <Grid item xs={12}> 
                      <FormControl style={{float: "right",width:400,marginRight:27 }} variant="outlined">
                        <p>วันที่นำเข้าอุปกรณ์</p>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDateTimePicker
                                name="InputDate"
                                value={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date("2018-01-01T00:00")}
                                format="yyyy/MM/dd hh:mm a"
                                fullWidth
                              />
                          </MuiPickersUtilsProvider>
                      </FormControl>
                    </Grid>
                    

                    <Grid item xs={6}>
                        <Button 
                                variant="contained" 
                                color="primary" 
                                component={RouterLink}
                                to="/equip"
                                >อุปกรณ์</Button>
                    </Grid>


                    <Grid item xs={6}>
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        onClick={submit}
                        color="primary"
              
                      >
                        เพิ่ม
                      </Button>
                    </Grid>

                </Grid>   
        </Paper>
    </Container>
  )
}