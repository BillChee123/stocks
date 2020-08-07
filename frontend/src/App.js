import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Route component={Dashboard} path="/" />
    </BrowserRouter>
  );
}

export default App;
