'use client'
import React from 'react';

export default function Navbar({ activeLink, setActiveLink }) { 
  const [logoHovered, setLogoHovered] = React.useState(false);
  const [logoWidth, setLogoWidth] = React.useState(90);

  React.useEffect(() => {
    if (logoHovered) {
      setLogoWidth(220);
    } else {
      setLogoWidth(90);
    }
  }, [logoHovered]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'team', label: 'Our Team' },
    { id: 'datasources', label: 'Data Sources' }
  ];

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '60px',
    transition: 'transform 0.3s ease, background 0.3s ease',
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <nav style={{
        background: 'transparent',
        padding: '1.5rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          
          <div
            style={{
              ...glassStyle,
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: logoHovered ? 'flex-start' : 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              width: `${logoWidth}px`,
              transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1), justify-content 1.5s cubic-bezier(0.19, 1, 0.22, 1)',
              position: 'relative'
            }}
            onClick={() => setActiveLink('home')} 
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <img
              src="https://raw.githubusercontent.com/kijv/kiwi/refs/heads/website/website/KiwiFull2.png"
              alt="Kiwi Logo"
              style={{
                height: '70px',
                width: '200px',
                objectFit: 'cover',
                objectPosition: logoHovered ? 'left center' : '5% center',
                filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.2))',
                userSelect: 'none',
                flexShrink: 0,
                transition: 'object-position 1.5s cubic-bezier(0.19, 1, 0.22, 1)'
              }}
            />
          </div>

          <ul style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none',
            gap: '0.5rem',
            ...glassStyle,
            padding: '0.5rem',
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
                    padding: '0.75rem 0.75rem',
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
                    overflow: 'hidden',
                    cursor: 'pointer'
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