import { Box } from "@material-ui/core";
import * as React from "react";
import {
  BookingTimeInterface,
  CourtInterface,
  ZoneInterface,
  ReserveInterface,
} from "../model/ReserveUI";
import { FacilityInterface, PackageInterface } from "../model/FacilityUI";
import { UserInterface } from "../model/UserUI";

//-----------------------------------------------------------------
import { ChangeEvent, useEffect, useState, SyntheticEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { FormControl } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDateTimePicker } from "@material-ui/pickers";


const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    fullbox: { width: 550 },
    root: { flexGrow: 1, marginTop: theme.spacing(2), maxWidth: "md" },

    container: { marginTop: theme.spacing(4) },

    paper: { padding: theme.spacing(3), color: theme.palette.text.secondary },

    table: { minWidth: 20 },

    textfield: { width: 400 },

    datefield: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

 function CreateReserve  () {

  const classes = useStyles();


  const User: UserInterface = JSON.parse(localStorage.getItem("User") || "");
  const [Reserve, setReserve] = useState<Partial<ReserveInterface>>({});
  const [Zone, setZone] = useState<ZoneInterface[]>([]);
  const [Facility, setFacility] = useState<FacilityInterface[]>([]);
  const [Court, setCourt] = useState<CourtInterface[]>([]);
  const [BookingTime, setBookingTime] = useState<BookingTimeInterface[]>([]);
  
  // const [Vpac,setVpac] = React.useState(Number);
  const [Zonepac, setZonepac] = React.useState(false);
  
  // const pac = Facility.map((item: FacilityInterface) => {
  //     return item.Package.ID
  //   });
  

  // useEffect(() => {
  //   getZonePac(Facility.map((item: FacilityInterface) => {
  //     return item.Package.ID}));
  // }, [Zonepac]);
  // async function test1 (){
  //   const Varpac =  () => {
  //     var PacageClass = 0;
  //     for (let i = 0 ; 3 >= i ; i++)
  //     {
  //       if (Facility[i]?.Package.ID > PacageClass) {
  //         PacageClass = Facility[i]?.Package.ID
  //       }
  //   }
  //   return Facility.find(F=>PacageClass===F.Package.ID)?.ID
    
  //   };
  // }

  const pac = Facility.map((item: FacilityInterface) => {
    return item.Package.ID

  });
 

   useEffect (()  => {
    getFacility(User.ID);
    getZonePac(pac);
  }, [Zonepac]);
  
  

  
  const handleChange = (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Reserve;
    setReserve({ ...Reserve, [name]: event.target.value });
    if (name == "FacilityID"){
      setZonepac(!Zonepac)
    }
  };

  //GetUser=============================================================================================
  const getFacility = async(UserID: unknown) => {
    const apiUrl = `http://localhost:8080/api/ListFacilityZone/${User.ID}`; //ดึง
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
          setFacility(res.data);
        } else {
          console.log("else");
        }
      });
      
      
  };
  
  // console.log("ASDDSADAS",test1())

//   const getPacage =  () => {
//     var PacageClass = 0;
//     for (let i = 0 ; 3 >= i ; i++)
//     {
//       if (pac[i] > PacageClass) {
//         PacageClass = pac[i];
//       }
//   }
//   return PacageClass
// }


  //Get Zone ==========================================================================================
  
  const getZonePac = async (PacID: unknown) => {
    const apiUrl = `http://localhost:8080/api/ListZonePac/${PacID}`; //ดึง
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
          setZone(res.data);
        } else {
          console.log("else");
        }
      });
      
  };


  const SelectZoneChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setCourt([]);
    setBookingTime([]);
    delete Reserve.BookingTimeID;
    const value = event.target.value;
    getCourt(value);

    return value;
  };

  //Court =============================================================================================
  const SelectCourtChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    delete Reserve.BookingTimeID;
    const value = event.target.value;
    getBookingTime(value);
  };

  const getCourt =  (ZoneID: unknown) => {
    const apiUrl = `http://localhost:8080/api/ListCourt/${ZoneID}`; //ดึง
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
          setCourt(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //Get BookingTime ==================================================================================
  const getBookingTime =  async (CourtID: unknown) => {
    const apiUrl = `http://localhost:8080/api/ListBookingTime/${CourtID}`; //ดึง
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
          setBookingTime(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //===========================================================================
  const [AddedTime, setAddedTime] = useState<Date | null>(new Date());
  const handleAddedTime = (date: Date | null) => {
    setAddedTime(date);
  };
  //state  =======================================================================
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    setWarning(false);
  };

  //==========================================================================
  const submitReserve = () => {
    let data = {
      UserID: User.ID,
      FacilityID: Reserve.FacilityID,
      BookingTimeID: Reserve.BookingTimeID,
      Amount:
        typeof Reserve.Amount == "string"
          ? parseInt(Reserve.Amount)
          : Reserve.Amount,
      Tel: Reserve.Tel,
      AddedTime: AddedTime,
    };
    console.log(data);
    if (!Reserve.Amount) {
      console.log("กรุณาใส่ข้อมูลให้ครบ หรือ ใส่ข้อมูลให้ถูกต้อง");
      setWarning(true);
      return;
    }
    if (!Reserve.Tel) {
      console.log("กรุณาใส่ข้อมูลให้ครบ หรือ ใส่ข้อมูลให้ถูกต้อง");
      setWarning(true);
      return;
    }
    if (!Reserve.BookingTimeID) {
      console.log("กรุณาใส่ข้อมูลให้ครบ หรือ ใส่ข้อมูลให้ถูกต้อง");
      setWarning(true);
      return;
    }
    const apiUrl = "http://localhost:8080/api/CreateReserve";
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
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
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={800}
        onClose={handleClose}
        TransitionProps={{
          onExit: () => {
            window.location.href = "/HistoryReserve";
          },
        }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={warning} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          กรุณาใส่ข้อมูลให้ครบ หรือ ใส่ข้อมูลให้ถูกต้อง
        </Alert>
      </Snackbar>

      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Reserve
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <p>Name</p>
            <Select
              variant="outlined"
              disabled
              defaultValue={0}
              style={{ width: 350 }}
            >
              <MenuItem value={0}>{User.Name}</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <p>Package</p>
            <Select
              variant="outlined"
              defaultValue={0}
              inputProps={{ name: "FacilityID" }}
              value={Reserve.FacilityID}
              onChange={handleChange}
              style={{ width: 350 }}
            >
              <MenuItem value={0} key={0} disabled>
                Select Pakage
              </MenuItem>
              {Facility.map((item: FacilityInterface) => (
                <MenuItem value={item.ID} key={item.ID}>
                  {item.Package.Name}
                </MenuItem>
              ))}
            </Select>
          </Grid>


          <Grid item xs={6}>
            <p>Zone</p>
            <Select
              variant="outlined"
              defaultValue={0}
              inputProps={{ name: "ZoneID" }}
              onChange={SelectZoneChange}
           
              style={{ width: 350 }}
            >
              <MenuItem value={0} key={0} disabled>
                Select Zone
              </MenuItem>
              {Zone.map((item: ZoneInterface) => (
                <MenuItem value={item.ID} key={item.ID}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={6}>
            <p>Court</p>
            <Select
              variant="outlined"
              defaultValue={0}
              inputProps={{ name: "CourtID" }}
              onChange={SelectCourtChange}
              style={{ width: 350 }}
            >
              <MenuItem value={0} key={0} disabled>
                Select Court
              </MenuItem>
              {Court.map((item: CourtInterface) => (
                <MenuItem value={item.ID} key={item.ID}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <p>Reserve Time</p>
            <Select
              variant="outlined"
              defaultValue={0}
              value={Reserve.BookingTimeID}
              inputProps={{ name: "BookingTimeID" }}
              onChange={handleChange}
              style={{ width: 350 }}
            >
              <MenuItem value={0} key={0} disabled>
                Select Time
              </MenuItem>
              {BookingTime.map((item: BookingTimeInterface) => (
                <MenuItem value={item.ID} key={item.ID}>
                  {item.Time}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={6}>
            <p>Amount</p>
            <TextField
              id="Amount"
              type="number"
              inputProps={{ name: "Amount" }}
              value={Reserve.Amount}
              onChange={handleChange}
              label=""
              variant="outlined"
              style={{ width: 350 }}
            />
          </Grid>

          <Grid item xs={12}>
            <p>Tel</p>
            <TextField
              id="Tel"
              type="string"
              inputProps={{ name: "Tel" }}
              value={Reserve.Tel || ""}
              onChange={handleChange}
              label=""
              variant="outlined"
              style={{ width: 350 }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl style={{ width: 350 }} variant="outlined">
              <p>Addedtime</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="WatchedTime"
                  value={AddedTime}
                  onChange={handleAddedTime}
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              variant="contained"
              color="primary"
              onClick={submitReserve}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default CreateReserve;
