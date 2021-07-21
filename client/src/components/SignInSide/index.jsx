import React,{useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './style.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from '../../App';

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

export default function SignIn() {
  const classes = useStyles();
  const { user, setUser} = useContext(UserContext);


  const [userPassword, setUserPassword] = useState("")
  const [userName, setUserName] = useState("")
  const history = useHistory();
  

    function handleNameInputChange(event) {
      const value = event.target.value;
      // console.log(value)
      setUserName(value)
      
    }
    function handlePasswordInputChange(event) {
      const value = event.target.value;
      // console.log(value)
      setUserPassword(value)
      
    }
    function loginRequest(event) {
        event.preventDefault()
        const data = { username: userName, password: userPassword}
        axios.post('/api/user/login', data )
            .then(data => {
              setUser({...user, loggedIn: true})
              console.log('Success:');
              history.push("/")
            })
            .catch((error) => {
              console.error('Error:', error);
              window.alert("Wrong login information");
            });
    }

  return (
    <div className="home-body">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleNameInputChange}
            value={userName}
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
            onChange={handlePasswordInputChange}
            value={userPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginRequest}
          >
          Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}