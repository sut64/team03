import { useEffect, useState } from "react";
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
import { EventInterface } from "../model/EventUI";
import { format } from 'date-fns'
import moment from "moment";
import { UserInterface, UserloginInterface, RoleloginInterface } from "../model/UserUI";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
    button: {
      
      margin: theme.spacing(2),
      background: '#dd0000',
      color: '#ffffff',
    },
  })
);

function PreloadEvents() {
  const classes = useStyles();
  const [Evet, setEvent] = useState<EventInterface[]>([]);
  const [role, setRole] = useState<string>("");
  const [user, setuser] = useState<UserInterface>();
  const apiUrl = "http://localhost:8080/ListEvent";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
    },
  };

  const getEvent = async () => {
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setEvent(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getEvent();
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setuser(JSON.parse(localStorage.getItem("User")|| ""))
      setRole(localStorage.getItem("Role") || "");
    } 
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth = "lg" >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              ??????????????????????????????????????????????????????
            </Typography>
          </Box>
          {role === "admin" && user?.Role.Name === role && ( <>
            <Button className={classes.button}
              component={RouterLink}
              to="/CreateEvent"
              variant="contained"
              color="primary"
            >
              ??????????????????????????????????????????????????????
            </Button>
          </>
          )}
          <Box>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ?????????????????????????????????
                </TableCell>
                <TableCell align="center" width="15%">
                  Trainner
                </TableCell>
                <TableCell align="center" width="10%">
                  TypeEvent
                </TableCell>
                <TableCell align="center" width="5%">
                  Room
                </TableCell>
                <TableCell align="center" width="20%">
                  Details
                </TableCell>
                <TableCell align="center" width="15%">
                  ???????????????????????????????????????
                </TableCell>
                <TableCell align="center" width="20%">
                  ???????????????????????????
                </TableCell>
                <TableCell align="center" width="20%">
                 ??????????????????
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {Evet.map((item: EventInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.Name}</TableCell>
                  <TableCell align="center">{item.Trainner.Name}</TableCell>
                  <TableCell align="center">{item.TypeEvent.Name}</TableCell>
                  <TableCell align="center">{item.Room.Name}</TableCell>
                  <TableCell align="center">{item.Details}</TableCell>
                  <TableCell align="center">{item.Amount}</TableCell>
                  <TableCell align="center">{moment(item.TimeStart).format("DD MMMM yyyy hh:mm a")}</TableCell>
                  <TableCell align="center">{moment(item.TimeEnd).format("DD MMMM yyyy hh:mm a")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default PreloadEvents;
