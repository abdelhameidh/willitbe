import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Visual from './components/Visual';


const App = () => {
  return (
   
      
        <>
          <div className='pt-[4.7re5m] lg:pt-[5.25rem] overflow-hidden'>
            <Header />
            <Hero />
            <Benefits />
            <Visual />
            
          </div>
          <ButtonGradient />
        </>
      
   
  );
}

export default App;
