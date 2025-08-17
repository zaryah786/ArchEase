import { useState, useEffect } from 'react';
import './LoadingScreen.css';
import logo from './LOGO 4k.png';

const LoadingScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1200);

      return () => clearTimeout(completeTimer);
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="logo-container">
        <div className={`logo-half logo-top ${isAnimating ? 'split-top' : ''}`}>
          <img src={logo} alt="ArchEase Logo" />
        </div>
        <div className={`logo-half logo-bottom ${isAnimating ? 'split-bottom' : ''}`}>
          <img src={logo} alt="ArchEase Logo" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;