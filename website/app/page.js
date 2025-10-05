'use client'
import React, { useState } from 'react';
import Navbar from './components/navbar';
import AboutUs from './aboutus';
import DataSources from './datasources';

export default function Home() {
  const [activePage, setActivePage] = useState('home');

  const HomeContent = () => (
    <div style={{
      minHeight: '100vh',
      color: 'white',
      padding: '10rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'team':
        return <AboutUs />; 
      case 'datasources':
        return <DataSources />;
      case 'home':
      default:
        return <HomeContent />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #edededff 0%, #2d7a3e 100%)'
    }}>
      <Navbar activeLink={activePage} setActiveLink={setActivePage} />
      {renderContent()}
    </div>
  );
}