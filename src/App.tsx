import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Dashboard from './pages/Dashboard';
import { useAppContext } from './store';
import axios from 'axios';
import { useAxiosLoader } from './customHooks/useAxiosLoader';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className='App'>
      {counter > 0 && <p style={{ textAlign: 'center' }}>loading..</p>}
      <Dashboard />
    </div>
  );
}

export default App;
