'use client'
import React, { useState } from 'react';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'team', label: 'Our Team' },
    { id: 'datasources', label: 'Data Sources' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #edededff 0%, #2d7a3e 100%)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <nav style={{
        background: 'transparent',
        padding: '1.5rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}>
            Logo
          </div>
          
          <ul style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.5rem',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            margin: 0
          }}>
            {navItems.map(item => (
              <li key={item.id} style={{ display: 'inline-block' }}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveLink(item.id);
                  }}
                  style={{
                    color: activeLink === item.id ? '#2d7a3e' : 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    fontWeight: 500,
                    textShadow: activeLink === item.id ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.2)',
                    background: activeLink === item.id ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                    boxShadow: activeLink === item.id 
                      ? '0 4px 20px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)'
                      : 'none',
                    transform: activeLink === item.id ? 'translateY(-1px)' : 'none',
                    display: 'inline-block',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (activeLink !== item.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeLink !== item.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.label}
                  {activeLink === item.id && (
                    <span style={{
                      content: '',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
                      borderRadius: '50px 50px 0 0',
                      pointerEvents: 'none'
                    }} />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}