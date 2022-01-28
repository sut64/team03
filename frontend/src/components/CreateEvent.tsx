import React, { ChangeEvent,
    useEffect,
    useState, 
    Fragment, 
    SyntheticEvent } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MenuItem } from '@material-ui/core';
import { TrainnerInterface, RoomInterface, TypeEventInterface, EventInterface } from "../model/EventUI";
import { Select } from '@material-ui/core';
import { time, timeEnd } from 'console';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import {MuiPickersUtilsProvider,KeyboardDatePicker, KeyboardDateTimePicker,} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';





const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: { flexGrow: 1 },
        container: { marginTop: theme.spacing(2) },
        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
        table: { minWidth: 20 }
    })
);

function Body() {
    const classes = useStyles();
  
    const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Evet;
    setEvet({
      ...Evet,
      [name]: event.target.value,
    });
  };

  const  [AddTime1,setAddTime1] = useState<Date|null>(new Date());
  const handleAddTime1 = (date: Date | null) => {setAddTime1(date);}

  const  [AddTime2,setAddTime2] = useState<Date|null>(new Date());
  const handleAddTime2 = (date: Date | null) => {setAddTime2(date);}
    
    
    
    const [Evet, setEvet] = useState<Partial<EventInterface>>({});
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
        
    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };
        
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    
    const [Trainner, setTrainner] = useState<TrainnerInterface[]>([]);
          const getTrainner = async() => {
          const apiUrl = "http://localhost:8080/ListTrainner";
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }

          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              console.log(res.data);
              if(res.data) {
                setTrainner(res.data)
              } else {
                console.log("else")
              }
            });
        }

        const [TypeEvent, setTypeEvent] = useState<TypeEventInterface[]>([]);
          const getTypeEvent = async() => {
          const apiUrl = "http://localhost:8080/ListTypeEvent";
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }

          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              console.log(res.data);
              if(res.data) {
                setTypeEvent(res.data)
              } else {
                console.log("else")
              }
            });
        }

        const [Room, setRoom] = useState<RoomInterface[]>([]);
          const getRoom = async() => {
          const apiUrl = "http://localhost:8080/ListRoom";
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }

          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              console.log(res.data);
              if(res.data) {
                setRoom(res.data)
              } else {
                console.log("else")
              }
            });
        }

        // submit
        const submitEvent = () => {
            let data = {
              TrainnerID: Evet.TrainnerID,
              RoomID: Evet.RoomID,
              TypeEventID: Evet.TypeEventID,
              Name: Evet.Name,
              Details: Evet.Details,
              TimeStart: AddTime1,
              timeEnd: AddTime2,
              Amount: typeof Evet.Amount === "string"? parseInt(Evet.Amount):Evet.Amount,

                
            }; 
            const apiUrl = "http://localhost:8080/CreateEvent";
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
                  setSuccess(true);
                } else {
                  setError(true);
                }
            });
          }

       


        useEffect(() => {
            getTrainner();
            getTypeEvent();
            getRoom();
          }, []);


          

          console.log(Trainner)
          console.log(TypeEvent)
          console.log(Room)

    return (

        <Container className={classes.container} maxWidth="md">
          <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} TransitionProps={{onExit: () => {window.location.href="/HistoryEvent";}}}>
            <Alert onClose={handleClose} severity="success">
               บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
            <Paper className={classes.paper}>
                <Box display="flex" sx={{height: 60}}>
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h4"
                            color="primary"
                            gutterBottom
                        >
                            ตารางกิจกรรม
                        </Typography>
                        
                    </Box>
                </Box>
                <Divider />
                <Grid container className={classes.root}>

                <Grid item xs={12}>
                        <p>Trainner</p>
                        <Select
                             value={Evet.TrainnerID}
                             onChange={handleChange}
                             inputProps={{
                             name: "TrainnerID",
                            }}
                            style={{ width: 200 }}
                            
                        >
                            <MenuItem value={0} key={0}>เลือกเทรนเนอร์</MenuItem>
                            {Trainner.map((item: TrainnerInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Name}</MenuItem>))}
                        </Select>
                </Grid>

                    <Grid item xs={6}>
                        <p>TypeEvent</p>
                        <Select
                             value={Evet.TypeEvent}
                             onChange={handleChange}
                             inputProps={{
                             name: "TypeEventID",
                            }}
                            style={{ width: 200 }}
                            
                        >
                            <MenuItem value={0} key={0}>เลือกประเภทอีเวนต์</MenuItem>
                            {TypeEvent.map((item: TypeEventInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Name}</MenuItem>))}
                        </Select>
                        <p></p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>Room</p>
                        <Select
                             value={Evet.Room}
                             onChange={handleChange}
                             inputProps={{
                             name: "RoomID",
                            }}
                            style={{ width: 200 }}
                            
                        >
                            <MenuItem value={0} key={0}>เลือกห้อง</MenuItem>
                            {Room.map((item: RoomInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Name}</MenuItem>))}
                        </Select>
                        <p></p>
                    </Grid>




                    <Grid item xs={6}>
                        <p>ชื่อกิจกรรม</p>
                        <TextField 
                        
                        
                        id = "Name"
                        type = "string"
                        inputProps = {{name:"Name"}}
                        value = {Evet.Name}
                        onChange={handleChange}
                        
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <p>จำนวน</p>
                        <TextField 
                        
                        

                        id = "Amount"
                        type = "number"
                        inputProps = {{name:"Amount"}}
                        value = {Evet.Amount}
                        onChange={handleChange}
                        
                        
                        />
                    </Grid>
                

                    <Grid item xs={12}>
                        <p>รายละเอียด</p>
                        <TextField
                            fullWidth
                            multiline rows = {3}
                            
                            placeholder="รายละเอียด" 

                            id = "Details"
                            type = "string"
                            inputProps = {{name:"Details"}}
                            value = {Evet.Details}
                            onChange={handleChange}       
                        />

                    </Grid>

                    


                    <Grid item xs={6}>
                        <p>เวลาเริ่ม</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                            name="TimeStart"
                            value={AddTime1}
                            onChange={handleAddTime1}
                            format="yyyy/MM/dd hh:mm a"
                           
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>


                    <Grid item xs={6}>
                        <p>เวลาจบ</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                            name="TimeEnt"
                            value={AddTime2}
                            onChange={handleAddTime2}
                            format="yyyy/MM/dd hh:mm a"
                            
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                              
                    <Grid item xs={12}>
                        <Button style={{ float: "right" , marginTop: 30}}
                            variant="contained"
                            color="primary"
                            onClick={submitEvent}
                            >
                            บันทึก
                        </Button>
                    </Grid>
                    
                
                </Grid>
            </Paper>
        </Container>

    )
}

export default Body;
