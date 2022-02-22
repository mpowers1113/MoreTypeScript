import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Parent } from './Components/Parent';
import { GuestList } from './Components/GuestList';
import { UserSearch } from './Components/UserSearch';

function App() {
  return (
    <>
      <div className="App">
        <Parent />
      </div>
      <div className="mt-4">
        <GuestList />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <UserSearch />
      </div>
    </>
  );
}

export default App;
