import React,{useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
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
import { UserContext } from '../../App';
import './style.css'

export default function Logout() {

    const history = useHistory();
    const { user, setUser} = useContext(UserContext);

    function userLogout(event) {
        event.preventDefault()
        axios.get('/api/user/logout')
            .then(data => {
              setUser({...user, loggedIn: false})
              console.log('Success:');
              history.replace("/");

            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }

    return (
        <form className="notsure">
<div className="button">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={userLogout}
          >
          Logout
          </Button>
          </div>
        </form>
    )
}