import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import './App.css';

const Home = () => {
  return (
    <div className='home-container'>
        <Navbar />
        <Hero />
    </div>
  )
}

export default Home;