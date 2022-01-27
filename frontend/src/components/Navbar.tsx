import React from 'react';
import { useEffect, useState, Component } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Menu from '@material-ui/core/Menu';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    colornavbar: {
      background: '#dd0000',
    },
    coloruser: {
      background: 'linear-gradient(20deg, #FF7BA4 25%, #FF7BA4 90%)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color : '#ffffff',
      flexGrow: 1,
    },
  }),
);



export default function Navbar() {

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: 'left', open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: 'left') => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style  = {{  width : 300}}>
          <ListItem style  = {{  color: '#ffffff',fontSize: 20, height : 100 , background: 'linear-gradient(20deg, #FFAACA 25%, #FFDD96 90%)'}}>
            Equipment Borrowing
          </ListItem>

          <Divider />

          <ListItem style  = {{  height : 80 }} component={RouterLink} to="/">
            <ListItemIcon > <HomeIcon sx={{ fontSize: 40 , color : '#FFDD96' }}/> </ListItemIcon>
            <ListItemText primary={'หน้าแรก'}/>
          </ListItem>

          <Divider />

          <ListItem style  = {{  height : 80}} component={RouterLink} to="/medhis">
            <ListItemIcon> <ListAltIcon sx={{ fontSize: 40 , color : '#FFDD96' }}/> </ListItemIcon>
            <ListItemText primary={'ดูประวัติการรักษา'} />
            
          </ListItem>

          <Divider />

          <ListItem style  = {{  height : 80}} component={RouterLink} to="/create">
            <ListItemIcon> <AddCircleIcon sx={{ fontSize: 40 , color : '#FFDD96' }}/> </ListItemIcon>
            <ListItemText primary={'สร้างประวัติการรักษา'} />
          </ListItem>

          <Divider />


      </List>
      
    </Box>
  );

  return (
    <div className={classes.root}>
     
      <AppBar position="static" className={classes.colornavbar}>
        <Toolbar>
        <Button sx={{ color: '#ffffff' }} onClick={toggleDrawer('left', true)}><MenuIcon/></Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
          
          <Typography variant="h5" className={classes.title} component={RouterLink}
            to="/">
            Borrowing System
          </Typography>
          {auth && (
            <div>
              
              
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >


              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                
                <MenuItem onClick={Logout}><LogoutIcon/> Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
