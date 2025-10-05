'use client'
import React from 'react';

export default function DataSources() {
    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '60px',
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #edededff 0%, #2d7a3e 100%)',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <div style={{
                ...glassStyle,
                padding: '1.5rem 3rem',
                marginBottom: '3rem'
            }}>
                <h1 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 0,
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                }}>
                    Data Sources
                </h1>
            </div>

            <div style={{
                maxWidth: '800px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                alignItems: 'center'
            }}>

                <div style={{
                    ...glassStyle,
                    padding: '2rem',
                    width: '100%'
                }}>
                    <p style={{
                        color: 'white',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        margin: 0,
                        textAlign: 'justify'
                    }}>
                        This section outlines the robust and verified data sources that power our analytics. We prioritize transparency and accuracy, ensuring all insights are built upon reliable public and proprietary datasets. A comprehensive list of APIs, partners, and institutional references will be provided here shortly.
                    </p>
                </div>

                <div style={{
                    ...glassStyle,
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60%',
                }}>
                    <img
                        src="https://github.com/kijv/kiwi/blob/website/KiwiWeatherFullHorizontal.png?raw=true"
                        alt="Our Team"
                        style={{
                            width: '100%',
                            height: '60%',
                            borderRadius: '0px',
                            boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)'
                        }}
                    />
                </div>

            </div>

            <div style={{
                marginTop: 'auto',
                paddingTop: '3rem',
                color: 'white',
                fontSize: '0.9rem',
                textAlign: 'center',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}>
                Copyright 2025 Solon Superstars
            </div>

        </div>
    );
}