import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './MenuBar.css';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const MenuBar = () => {

  const{setAuthData} = useContext(AppContext);
  const navigate = useNavigate();

  const logout  = () =>{

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthData(null, null);
    navigate('/login');
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2" role="navigation">
      <NavLink className="navbar-brand" to="/">
        <img src={assets.logo} alt="Logo" height="40" />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/explore"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Explore
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/items"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Manage Items
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/category"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Manage Categories
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/users"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Manage Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/orders"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Order History
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto me-3">
  <li className="nav-item dropdown">
    <a
      href="#"
      className="nav-link dropdown-toggle d-flex align-items-center"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        src={assets.user}
        alt="User"
        className="rounded-circle border"
        height={36}
        width={36}
        style={{ objectFit: "cover", marginRight: "8px" }}
      />
      <span className="d-none d-md-inline">Profile</span>
    </a>

    <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="navbarDropdown">
      <li>
        <h6 className="dropdown-header">Welcome!</h6>
      </li>
      <li>
        <NavLink to="/activity" className="dropdown-item">
          <i className="bi bi-clock-history me-2"></i> Activity Log
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" className="dropdown-item">
          <i className="bi bi-gear me-2"></i> Settings
        </NavLink>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <NavLink to="/login" className="dropdown-item text-danger" onClick={logout}>
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </NavLink>
      </li>
    </ul>
  </li>
</ul>

      </div>
    </nav>
  );
};

export default MenuBar;
