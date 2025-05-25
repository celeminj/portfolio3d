import React from 'react';

const Loader = ({ progress }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{
      width: '100px',
      height: '100px',
      border: '5px solid rgba(255, 255, 255, 0.2)',
      borderTop: '5px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }} />
    <h2>Cargando portafolio en 3D {Math.round(progress)}%</h2>
    <div style={{
      width: '300px',
      height: '10px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
      marginTop: '20px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: 'white',
        transition: 'width 0.3s ease'
      }} />
    </div>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}
    </style>
  </div>
);

export default Loader;