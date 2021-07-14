import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        HappyHealth
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
// create states where the user's information can be saved. this info will be retrieved by the onclick function


export default function SignUp() {
  const classes = useStyles();

  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userName, setUserName] = useState("")
  
    function handleEmailInputChange(event) {
      const value = event.target.value;
      console.log(value)
      setUserEmail(value)
      
    }
    function handleNameInputChange(event) {
      const value = event.target.value;
      console.log(value)
      setUserName(value)
      
    }
    function handlePasswordInputChange(event) {
      const value = event.target.value;
      console.log(value)
      setUserPassword(value)
      
    }
    function createUserRequest(event) {
        event.preventDefault()
        const data = { username: userName, email: userEmail, password: userPassword}
        axios.post('/api/user', data )
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="firstName"
            id="firstName"
            autoComplete="current-firstName"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="lastName"
            id="lastName"
            autoComplete="current-lastName"
            onChange={handleNameInputChange}
            value={userName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // this is the onClick functinality
            onChange={handleEmailInputChange}
            value={userEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // this is the onClick functinality
            onChange={handlePasswordInputChange}
            value={userPassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createUserRequest}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}