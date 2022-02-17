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
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import { format } from 'date-fns'
import { FacilityInterface } from "../model/FacilityUI";
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {marginTop: theme.spacing(3)},
    paper: {padding: theme.spacing(3)},
    table: {minWidth: 650},
    tableSpace: {marginTop: 20},
    row: {'& > !': {borderBottom: 'unset'},},
  })
);





export default function HistoryFacility() {
    const classes = useStyles();
    const [Facility, setFacility] = useState<FacilityInterface[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = React.useState("");
  
    const getFacility = async() => {
      const apiUrl = "http://localhost:8080/getfacility";
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",},
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
  
    useEffect(() => {
      getFacility();
    }, []);

    const DeleteFacility = async (id: string | number | undefined) => {
      const apiUrl = "http://localhost:8080/DeleteFacility";
      const requestOptions = {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",},
      };
    
      fetch(`${apiUrl}/${id}`, requestOptions)
      .then((response) => response.json())
      .then(
        (res) => {
          if (res.data) {
            setSuccess(true)
            setErrorMessage("")
          } 
          else { 
            setErrorMessage(res.error)
            setError(true)
          }  
          getFacility(); 
        }
      )
    }
  
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
              ข้อมูลสิทธิประโยชน์สำหรับสมาชิก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/CreateFacility"
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
                  สมาชิก
                </TableCell>
                <TableCell align="center" width="10%">
                  หมายเลขรายการ
                </TableCell>
                <TableCell align="center" width="15%">
                  Package
                </TableCell>
                <TableCell align="center" width="20%">
                  วันที่หมดอายุ
                </TableCell>
                <TableCell align="center" width="20%">
                  Trainer
                </TableCell>
                <TableCell align="center" width="10%">
                  Price
                </TableCell>
                <TableCell align="center" width="10%">
                  ลบรายการ
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {Facility.map((item: FacilityInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.User.Name}</TableCell>
                  <TableCell align="center">{item.No}</TableCell>
                  <TableCell align="center">{item.Package.Name}</TableCell>
                  <TableCell align="center">{format((new Date(item.PackageTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{item.Trainner.Name}</TableCell>
                  <TableCell align="center">{item.Price}</TableCell>
                  <TableCell align="center">
                  <IconButton aria-label="delete" onClick={() => DeleteFacility(item.ID)} > <DeleteIcon /> </IconButton>

                  </TableCell>
                 
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }