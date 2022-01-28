import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuBookIcon from  "@material-ui/icons/MenuBook";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton  from "@material-ui/core/IconButton";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import TocIcon from '@mui/icons-material/Toc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      
    },
    title: {
      flexGrow: 1,
    },
    small: {
        marginTop : theme.spacing(0.5),
        marginRight : theme.spacing(2),
        width: theme.spacing(5),
        height: theme.spacing(5),

      },
    leftmagin:{
        marginLeft:theme.spacing(3),
    },
    colorbar:{
        background: 'linear-gradient(45deg, #DF1B3F 30%, #19204E 70%, #DF1B3F 100%)',
        
    },
    menuButton: { marginRight: theme.spacing(2) },
    list: { width: 250 },
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  const menu = [
    { name: "สิทธิประโยชน์สำหรับสมาชิก", icon: <AssignmentIcon  />, path: "/CreateFacility" },
    { name: "ข้อมูลสิทธิประโยชน์สำหรับสมาชิก", icon: <MenuBookIcon  />, path: "/HistoryFacility" },
    { name: "บันทึกตารางกิจกรรม", icon: <MenuBookIcon  />, path: "/CreateEvent" },
    { name: "ผลการบันทึกตารางกิจกรรม", icon: <MenuBookIcon  />, path: "/HistoryEvent" },
    { name: "ยืมอุปกรณ์", icon: <SportsTennisIcon  />, path: "/BorrowingCreate" },
    { name: "ประวัติการยืมอุปกรณ์", icon: <TocIcon  />, path: "/Borrowing" },
    { name: "เพิ่มอุปกรณ์", icon: <MenuBookIcon  />, path: "/inputEquip" },
    { name: "อุปกรณ์ทั้งหมด", icon: <MenuBookIcon  />, path: "/equip" },
    { name: "บันทึกการชำระเงิน", icon: <MenuBookIcon />, path: "/PaymentCreate"},
    { name: "ประวัติการบันทึกการชำระเงิน", icon: <MenuBookIcon />, path: "/HistoryPayment"},
  ]
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (state: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpenDrawer(state);
  }

  return (
    
    <div className={classes.root} >
      <AppBar position="static"className={classes.colorbar} >
        <Toolbar>
        <IconButton 
            onClick={toggleDrawer(true)} 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>          
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <List 
              className={classes.list} 
              onClick={toggleDrawer(false)} 
              onKeyDown={toggleDrawer(false)}
            >
              <ListItem button component={RouterLink} to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText>หน้าแรก</ListItemText>
              </ListItem>
              <Divider />
              {menu.map((item, index) => (
                <ListItem key={index} button component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>

                </ListItem>
              ))}
              <ListItem button onClick={SignOut}>
              <ListItemIcon> <ExitToAppIcon/></ListItemIcon>
              <ListItemText>SignOut</ListItemText>
              </ListItem>

            </List>
          </Drawer>

          <Typography variant="h4"  className={classes.title}>
            
          </Typography>

          
          <Button onClick={SignOut} color="inherit" className={classes.small} >Logout</Button>
          
        </Toolbar>
            
      </AppBar>
    </div>
  );
}