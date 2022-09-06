import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from 'components/Navbar';
import DetailScreen from 'screens/DetailScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import ContactScreen from 'screens/ContactScreen';
import FavouriteScreen from 'screens/FavouriteScreen';
import HomeScreen from 'screens/HomeScreen';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/favourite' element={<FavouriteScreen />} />
          <Route path='/contact' element={<ContactScreen />} />
          <Route path='/people/:url' element={<DetailScreen />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
