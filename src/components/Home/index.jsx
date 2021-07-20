import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import './style.css'
import { Link } from "react-router-dom";

export default function Home() {
  return ( 
    // UPPER SECTION
    <div className="home-body">
    <Container component="main" maxWidth="md">
      <div className="section1">
<h1 className="upper-h1">Eat smarter.</h1>
<h1 className="upper-h1">Live Better.</h1>
<h1 className="bottom-h1">Discover your nutrition.</h1>
</div>

<div className="section2">
<div className="grey-background">
   <div className="section2-h1">
    <h3>HappyHealth encourages you to not just count your calories<br></br>but to focus on your nutriton as a whole.</h3>
    <h3>Eating smart has never been easier.</h3>
    <h3>Use our calorie calculator to generate a daily meal plan<br></br> and take control over your diet.</h3>
    <h3>Create an account to save meals for future use.</h3>
    </div>

  <div className="button-family">
      <div className='signup-button'>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            <Link to="/signup">Create an account</Link>
          </Button>
      </div>
      </div>
    </div>
  </div>
    </Container>
    </div>
 
    
  );
}