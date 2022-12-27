import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import { Outlet } from 'react-router';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: 'flex',
  },
  logo: {
    flexGrow: '1',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    marginLeft: theme.spacing(20),
    '&:hover': {
      color: 'yellow',
      borderBottom: '1px solid white',
    },
  },
}));
function Nav() {
  const classes = useStyles();
  let isAdmin = localStorage.getItem('isAdmin');
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <>
      <AppBar position='sticky'>
        <CssBaseline />
        <Toolbar>
          <Typography variant='h4' className={classes.logo}>
            My Villa
          </Typography>
          <div className={classes.navlinks}>
            {isAdmin === true ? (
              <>
                <Link to='/Home' className={classes.link}>
                  Home
                </Link>
                <Link to='/CreateVilla' className={classes.link}>
                  Create Villa
                </Link>
                <Link to='/CreateVillaNumber' className={classes.link}>
                  Villa Number
                </Link>
              </>
            ) : (
              <></>
            )}
            <Link to='/' className={classes.link}>
              <Button variant='contained' color='error' onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Nav;
