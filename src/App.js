import axios from 'axios';
import React, { useState } from 'react'
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import logoImg from './img/logo.png';
import descImg from './img/desc.png';
// import logo from './logo.svg';
import './App.css';
import Correct from './Components/Correct';
import Test from './Components/Test';

function App() {
  return (
    <div id="header" style={{display:"grid", gridGap:"10px"}}>
        <div style={ { display: "flex" , justifyContent: "space-between"} }>
            {/*
                <Navbar.Brand href="/demo">SGC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                        <Nav.Link href="/demo">DEMO</Nav.Link>
                        <Nav.Link href="/test">TEST</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
            */}

            <a href="/demo"><img src={logoImg}></img></a>
            <img src={descImg}></img>
        </div>

        <Route path="/demo" component={Correct} />
        <Route path="/test" component={Test} />

        <div id="footer" style={ { marginTop: "10px", display: "flex" , justifyContent: "center", borderTop :"solid #000069 2px"}}>
            <div>Copyright © 2021 성소-에듀템. All rights reserved.</div>
        </div>
    </div>
  );
}

export default App;
