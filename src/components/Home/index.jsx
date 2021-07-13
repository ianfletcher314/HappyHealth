import React from 'react';
import Container from '@material-ui/core/Container';
import './style.css'


export default function Home() {
  return ( 
    <div className="home-body">
    <Container component="main" maxWidth="md">
      <div className="section1">
<h1 className="upper-h1">Eat smarter.</h1>
<h1 className="upper-h1">Live Better.</h1>
<h1 className="bottom-h1">Discover your nutrition.</h1>
</div>
<h3>HappyHealth encourages you to not just count your calories but to focus on your nutriton as a whole.</h3>
<h3>Expect me to go over our features and how this application can benefit you.</h3>
    </Container>
    </div>
  );
}