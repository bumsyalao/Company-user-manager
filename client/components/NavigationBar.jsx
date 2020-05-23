import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav class="navbar navbar-light bg-light">
      <Link to="/homepage/create-company">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Create Your Company</button>
      </Link>
    </nav>
  );
}

export default NavigationBar;