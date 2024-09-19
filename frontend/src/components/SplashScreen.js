import React from 'react';

const SplashScreen = () => {
  const splashScreenStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  };

  return (
    <div style={splashScreenStyle}>
      <img src="/SplashScreenLogo.jpg" alt="Splash Screen Logo" style={imageStyle} />
    </div>
  );
};

export default SplashScreen;
