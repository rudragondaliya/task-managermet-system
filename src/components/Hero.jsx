import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="main-panel d-flex vh-100 bg-light">
      <div className="bg-white border-end shadow-sm" style={{ width: '250px' }}>
        <SideBar />
      </div>
      <div className="flex-grow-1 p-4 overflow-auto bg-white">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Hero;

