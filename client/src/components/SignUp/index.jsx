import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import "./style.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  // create states where the user's information can be saved. this info will be retrieved by the onclick function
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  // create functions that handle the input change of the textfileds
  function handleEmailInputChange(event) {
    const value = event.target.value;
    setUserEmail(value);
  }
  function handleNameInputChange(event) {
    const value = event.target.value;
    setUserName(value);
  }
  function handlePasswordInputChange(event) {
    const value = event.target.value;
    setUserPassword(value);
  }
  // function for button onCLick that uses axios post route
  function createUserRequest(event) {
    event.preventDefault();
    const data = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };
    axios
      .post("/api/user", data)
      .then((data) => {
        console.log("Success:");
        history.push("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Fill all fields");
      });
  }
  // this section has the UI the user will be inputing information into
  return (
    <div className="home-body">
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
              name="name"
              label="Name"
              type="name"
              id="name"
              autoComplete="current-firstName"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userName"
              label="User Name"
              type="userName"
              id="userName"
              autoComplete="current-userName"
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
      </Container>
    </div>
  );
}
