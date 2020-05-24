import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div className="navigationbar">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand">Welcome Bunmi</a>
        <Link to="/homepage/create-company">
          <button className="btn my-2 my-sm-0" type="submit">Create Your Company</button>
        </Link>
      </nav>
    </div>
  );
}

export default NavigationBar;