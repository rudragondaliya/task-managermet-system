import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/hero';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks'
import AddTask from './pages/AddNewTask';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />}>
        <Route index element={<Dashboard />} />   
        <Route path="all" element={<AllTasks />} /> 
        <Route path="add" element={<AddTask />} />  
      </Route>
    </Routes>
  );
};

export default App;
