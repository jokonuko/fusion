import React from 'react';
import logo from '../assets/logo.png';
import { logoutUser } from '../services/magic';

const navStyle = {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '10%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px 0',
};

const titleStyle = {
  margin: 0,
  padding: '0 20px',
  fontSize: '1.2em',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const itemStyle = {
  margin: '10px 0',
  padding: '0 20px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'underline',
};

const logoStyle = {
  padding: '0 20px'
}

const SideNavBar = () => {
  return (
    <nav style={navStyle}>
      <img src={logo} style={logoStyle} alt="logo" width={100} height={100} />

      <h3 style={titleStyle}>Neurofusion</h3>
      <ul style={listStyle}>
        <li style={itemStyle}>
          <a style={linkStyle} href="/">Experiments</a>
        </li>
        <li style={itemStyle}>
          <a style={linkStyle} href="/recordings">Recordings</a>
        </li>
        <li style={itemStyle}>
          <a style={linkStyle} href="/analysis">Analysis</a>
        </li>
        <li style={itemStyle}>
          <a style={linkStyle} href="/https://www.notion.so/Brain-Research-291b3c8f980d408f85d04f4c4772e8af">Research</a>
        </li>
        <li style={itemStyle}>
          <a style={linkStyle} href="#" onClick={logoutUser}>Logout</a>
        </li>
      </ul>

    </nav>
  );
};

export default SideNavBar;
