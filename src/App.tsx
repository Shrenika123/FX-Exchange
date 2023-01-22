import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Dashboard from './pages/Dashboard';
import { useAppContext } from './store';
import axios from 'axios';
import { useAxiosLoader } from './customHooks/useAxiosLoader';
import Loader from './atoms/Loader';

function App() {
  const { loading } = useAppContext();
  const [counter, setCounter] = useState(0);

  return (
    <div className='App'>
      {loading && <Loader />}
      {counter > 0 && <p style={{ textAlign: 'center' }}>loading..</p>}
      <Dashboard />
    </div>
  );
}

export default App;
