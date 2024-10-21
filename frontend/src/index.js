import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EntryScreen from './EntryScreen';
import SplashScreen from './components/SplashScreen';
import PlayActionDisplay from './PlayActionDisplay';

function RootComponent() {
  // Moves through the different states of the machine
    // 0 - SplashScreen
    // 1 - EntryScreen
    // 2 - PlayActionDisplay 
  const [screen, setScreen] = useState(0);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Function to start the game
  const startGame = () => {
    console.log("Started Game");
    setScreen(2);
  };

  // Function to reset the game
  const resetGame = () => {
    console.log("Reset Game");
    setScreen(1);
  };


  const switchScreen = (param) => {
    switch (param) {
      case 0:
        return <SplashScreen></SplashScreen>
      case 1:
        return <EntryScreen players={players} setPlayers={setPlayers} startGame={startGame}></EntryScreen>
      case 2:
        return <PlayActionDisplay players={players} resetGame={resetGame}></PlayActionDisplay>
      default:
        return <div>Unknown status.</div>;
    }
  };

  return (
    <React.StrictMode>
      {switchScreen(screen)}
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);