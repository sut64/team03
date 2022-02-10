import React, { ChangeEvent,
    useEffect,
    useState, 
    Fragment, 
    SyntheticEvent } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { FacilityInterface, PackageInterface, TrainnerInterface } from '../model/FacilityUI';
import { UserInterface } from '../model/UserUI';

import "@fontsource/kanit";
import '../../src/App.css';
import { createTheme,ThemeProvider } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Fade } from "@mui/material";
import { Autocomplete } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { red } from "@mui/material/colors";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const theme = createTheme({
    typography:{
        fontFamily:'kanit'
    },
    

});

export default function CreateFacility(){
  useEffect(() => {
    getPackage();
    getUser();
    getTrainner();
  }, []);
  const [Facility, setFacility] = React.useState<Partial<FacilityInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
    setError(false);
  };


  const [dateCheck, setdateCheck] = React.useState(false);


  const [value, setValue] = React.useState<Date | null>(null);
  const [inputValue, setInputValue] = React.useState('');




  const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof Facility;

    setFacility({ ...Facility, [name]: event.target.value, });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof Facility;
    setFacility({
      ...Facility, [name]: event.target.checked,
    });
  };

  const handleChangeUserID = (event: any, User?: UserInterface | null) => {
    if (!User) {
      delete Facility.UserID
      console.log(Facility)
      return
    }
    setFacility({ ...Facility, UserID: User.ID as number });
  };
  const handleChangePackageID = (event: any, Package?: PackageInterface | null) => {
    if (!Package) {
      delete Facility.PackageID
      console.log(Facility)
      return
    }
    setFacility({ ...Facility, PackageID: Package.ID as number });
  };
  const handleChangeTrainnerID = (event: any, Trainner?: TrainnerInterface | null) => {
    if (!Trainner) {
      delete Facility.TrainnerID
      console.log(Facility)

      return
    }
    setFacility({ ...Facility, TrainnerID: Trainner.ID as number });
  };

    const [User, setUser] = React.useState<UserInterface[]>([]);
    const getUser = async() => {
        const apiUrl = "http://localhost:8080/users";
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
              setUser(res.data)
            } else {
              console.log("else")
            }
          });
      }

    const [Package, setPackage] = React.useState<PackageInterface[]>([]);
    const getPackage = async() => {
        const apiUrl = "http://localhost:8080/package";
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
              setPackage(res.data)
            } else {
              console.log("else")
            }
          });
      }

    const [Trainner, setTrainner] = React.useState<TrainnerInterface[]>([]);
    const getTrainner = async() => {
        const apiUrl = "http://localhost:8080/trainner";
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
              setTrainner(res.data)
            } else {
              console.log("else")
            }
          });
      }

      const submit = () => {
        let data = {
          UserID:Facility.UserID,
          No:Facility.No,
          PackageTime:value,
          Price:convertType(Facility.Price),
          Confirm:Facility.Confirm,
          PackageID:Facility.PackageID,
          TrainnerID:Facility.TrainnerID,
        };
        console.log(data)
    
        const apiUrl = "http://localhost:8080/facilitycreate";
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
              setErrormessage("");
            } else {
              setError(true);
              setErrormessage(res.error);
            }
        });
      }

      const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

      
      console.log(Facility)
      console.log(value)
    return(
        <div  >
        <ThemeProvider theme={theme}>
            <Container className='container' maxWidth="md" >
            <Snackbar  anchorOrigin={{ vertical:"bottom", horizontal:"center" }} open={success} autoHideDuration={2000} onClose={handleClose} TransitionProps={{ onExit: () => (window.location.href = "/HistoryFacility") }} > 
              <Alert onClose={handleClose} severity="success">
                บันทึกข้อมูลสำเร็จ
              </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center" }} open={error} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                บันทึกข้อมูลไม่สำเร็จ : {errormessage}
              </Alert>
            </Snackbar>
                <Box border={5} borderColor = '#D0D9FF' width = "100%" height = "70vh" borderRadius = {3} >
                <Grid item xs ={12} >
                    <Typography className='margin5vh' variant="h6" fontFamily="kanit" color="#466BFF">
                        เลือกสิทธิประโยชน์สำหรับสมาชิก
                    </Typography>
                    <Divider variant="middle" />
                    <Box className='marginBoxtoGrid' >
                    <Autocomplete
                        onChange={handleChangeUserID}
                        options={User}
                        getOptionLabel={(U)=>U.Name}
                        fullWidth
                        renderInput={(params) => <TextField {...params} variant="standard" label="ชื่อสมาชิก" />}
                        />
                    </Box>
                    <Box className="marginBoxtoGrid">
                        <TextField variant="standard" fullWidth id="No"  placeholder="หมายเลขรายการ" label="หมายเลขรายการ*"  inputProps={{name:"No"}} value={Facility.No || ""} onChange={handleChange} />
                    </Box>
                <Grid container spacing={2} columns={12} marginTop="2vh">
                    <Grid item xs={6} >
                        <Box className="marginBox1" >
                        <Autocomplete
                            onChange={handleChangePackageID}
                            options={Package}
                            getOptionLabel={(P)=>P.Name}
                            fullWidth
                            renderInput={(params) => <TextField {...params}  fullWidth label="Package*" variant="standard"  placeholder="Package"/>}
                        />
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                      <Box  className="marginBox3">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                            setdateCheck(true);
                            
                          }}
                          renderInput={(params) => <TextField  fullWidth placeholder="สิ้นสุด" label="สิ้นสุด*" variant="standard"  {...params} />}
                        />
                      </LocalizationProvider>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} columns={12} marginTop="2vh">
                    <Grid item xs={6} >
                        <Box className="marginBox1" >
                        <Autocomplete
                            onChange={handleChangeTrainnerID}
                            fullWidth
                            options={Trainner}
                            getOptionLabel={(T)=>T.Name}
                            renderInput={(params) => <TextField {...params} fullWidth label="Trainner*" variant="standard"  placeholder="Trainner"/>}
                        />
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box className="marginBox2">
                        <TextField variant="standard" fullWidth id="Price"  placeholder="Price" label="Price*" inputProps={{name:"Price"}} onChange={handleChange} />
                        </Box>
                    </Grid>
                </Grid>

                <Box className='marginBox4' >
                    <FormControlLabel control={<Checkbox inputProps={{name:"Confirm"}} onChange={handleCheckboxChange}  color="error"/>} label="ฉันได้อ่านและยอมรับในข้อตกลง" />
                </Box>
                <Grid className='marginBox2' item xs={12}>
                        <Button  style={{ float: "right" }} 
                                variant="contained" 
                                color="primary" 
                                onClick={submit} 
                                >SUBMIT</Button>
                    </Grid>
                </Grid>
            </Box>
            </Container>
        </ThemeProvider>
        </div>
        
    )

}