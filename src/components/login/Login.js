import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import jwt from 'jwt-decode';
import { createAPIEndpoint, ENDPOINTS } from './../../api/Api';
import AlertMessage from './../common/AlertMessage';

import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageUserName, setErrorMessageUserName] = useState(false);
  const [errorMessagePass, setErrorMessagePass] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLoginClick = async () => {
    if (userName.trim() === '') {
      setErrorMessageUserName('Please enter User name');
      return;
    }
    if (password.trim() === '') {
      setErrorMessagePass('Please enter Password');
      return;
    }
    setLoading(true);

    let LoginRequest = {
      userName: userName,
      password: password,
    };
    createAPIEndpoint(ENDPOINTS.login)
      .post(LoginRequest)
      .then((res) => {
        const user = jwt(res.data.result.token);
        console.log('user', user);
        localStorage.setItem('token', res.data.result.token);
        localStorage.setItem('isAdmin', user.role === 'admin' ? true : false);
        console.log(localStorage.getItem('isAdmin'));
        navigate('/Home');
      })
      .catch((err) => {
        setApiError(true);
        setApiErrorMsg(err.response.data.errorMessages[0]);
        setTimeout(() => {
          setApiError(false);
        }, 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh', minWidth: '50vh' }}
    >
      <Grid item xs={12}>
        <HomeIcon color='primary' sx={{ fontSize: '80px' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography>Login to My Villa</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id='username'
          label='User name'
          variant='outlined'
          sx={{ width: '300px' }}
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            setErrorMessageUserName(false);
          }}
          helperText={errorMessageUserName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id='password'
          type='password'
          label='Password'
          variant='outlined'
          sx={{ width: '300px' }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessagePass(false);
          }}
          helperText={errorMessagePass}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          endIcon={<SendIcon />}
          sx={{ width: '300px' }}
          onClick={handleLoginClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {apiError && <AlertMessage message={apiErrorMsg} />}
      </Grid>
    </Grid>
  );
}

export default Login;
