import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaPlus } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";

const SideBar = () => {
  return (
    <div className="d-flex flex-column p-4 h-100 shadow-sm" style={{ width: '250px', backgroundColor: '#ffffff' }}>
      <h4 className="fw-bold mb-4 text-center">TaskMaster</h4>

      <ul className="nav flex-column">
          <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-dark d-flex align-items-center gap-2">
            <MdDashboard /> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2 ">
          <Link to="/all" className="nav-link text-dark d-flex align-items-center gap-2">
            <FaTasks /> All Tasks
          </Link>
        </li>
        <li className="nav-item mb-2 ">
          <Link to="/add" className="nav-link text-dark d-flex align-items-center gap-2">
            <FaPlus /> Add New Task
          </Link>
        </li>
      </ul>

      <div className="mt-auto text-center text-muted small pt-4">
        © 2025 Rudra
      </div>
    </div>
  );
};

export default SideBar;


