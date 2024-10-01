import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import Header from './components/header'
import { imagesArray } from './assets/constants'
import CardGrid from './components/card-grid'
import WinModal from './components/win-modal'

const shuffleArray = (array: Array<{ id: string; image: string }>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [flipped, setFlipped] = useState<string[]>(() => {
    const storedFlipped = window.localStorage.getItem('flipped');
    return storedFlipped ? JSON.parse(storedFlipped) : [];
  });
  
  const [currentTurn, setCurrentTurn] = useState<string[]>(() => {
    const storedCurrentTurn = window.localStorage.getItem('currentTurn');
    return storedCurrentTurn ? JSON.parse(storedCurrentTurn) : [];
  });
  
  const [shuffledImages, setShuffledImages] = useState<{ id: string, image: string, uniqueId: string }[]>(() => {
    const storedShuffledImages = window.localStorage.getItem('shuffledImages');
    return storedShuffledImages ? JSON.parse(storedShuffledImages) : [];
  });

  const [isFlippingAllowed, setIsFlippingAllowed] = useState<boolean>(true);
  
  const [moves, setMoves] = useState<number>(() => {
    const storedMoves = window.localStorage.getItem('moves');
    return storedMoves ? JSON.parse(storedMoves) : 0;
  });
 
  const [bestScore, setBestScore] = useState<number>(() => {
    const storedBestScore = window.localStorage.getItem('bestScore');
    return storedBestScore ? JSON.parse(storedBestScore) : 0;
  });
 
  const [gameWon, setGameWon] = useState<boolean>(() => { 
    const storedGameWon = window.localStorage.getItem('gameWon');
    return storedGameWon ? JSON.parse(storedGameWon) : false;
  });
  
  const [hardMode, setHardMode] = useState<boolean>(() => {
    const storedHardMode = window.localStorage.getItem('hardMode');
    return storedHardMode ? JSON.parse(storedHardMode) : false;
  });

  React.useEffect(() => {
    window.localStorage.setItem('flipped', JSON.stringify(flipped));
    window.localStorage.setItem('currentTurn', JSON.stringify(currentTurn));
    window.localStorage.setItem('shuffledImages', JSON.stringify(shuffledImages));
    window.localStorage.setItem('moves', JSON.stringify(moves));
    window.localStorage.setItem('bestScore', JSON.stringify(bestScore));
    window.localStorage.setItem('gameWon', JSON.stringify(gameWon));
    window.localStorage.setItem('hardMode', JSON.stringify(hardMode));
  }, [flipped, currentTurn, shuffledImages, moves, bestScore, gameWon, hardMode]);

  // shuffle the images, double them, add unique id and shuffle again
  const shuffleImages = () => {
    const imagesCopy = imagesArray.slice();
    const shuffledCopy = shuffleArray(imagesCopy);
    const randomImages = shuffledCopy.slice(0, 6);
    const doubleImages = [...randomImages, ...randomImages];
    const shuffledDoubleImages = shuffleArray(doubleImages);
    const imagesWithUniqueId = shuffledDoubleImages.map((image, index) => ({
      ...image,
      uniqueId: `${image.id}-${index}`
    }));
    setShuffledImages(imagesWithUniqueId);
  };

  // shuffle the images on component mount if the local storage is empty
  useEffect(() => {
    const storedShuffledImages = window.localStorage.getItem('shuffledImages');
    // check if the shuffled images are in local storage and if not, shuffle them
    if (!storedShuffledImages || JSON.parse(storedShuffledImages).length === 0) {
      shuffleImages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFlip = (uniqueId: string, id: string) => {
    if (!isFlippingAllowed) return;
    setCurrentTurn([...currentTurn, id]);
    setFlipped(prevState => 
      prevState.includes(uniqueId) 
        ? prevState.filter(id => id !== uniqueId) 
        : [...prevState, uniqueId]
    );
  };

  const handleReset = () => {
    setFlipped([]);
    setCurrentTurn([]);
    setIsFlippingAllowed(true);
    setGameWon(false);
    setMoves(0);
    shuffleImages();
  }

  const checkMatch = useCallback((currentTurn: string[]) => {
    if (currentTurn.length === 2) {
      setIsFlippingAllowed(false);
      if (currentTurn[0] === currentTurn[1]) {
        setCurrentTurn([]);
        setIsFlippingAllowed(true);
      } else {
        setTimeout(() => {
          setFlipped(hardMode ? [] : flipped.slice(0, -2));
          setCurrentTurn([]);
          setIsFlippingAllowed(true);
        }, 1000);
      }
      setMoves((moves) => moves + 1);
    }
  }, [flipped, hardMode, setFlipped, setCurrentTurn, setMoves]);

  useEffect(() => {
    checkMatch(currentTurn);
  }, [currentTurn, checkMatch]);

  useEffect(() => {
    if (shuffledImages.length > 0 && flipped.length === shuffledImages.length) {
      setGameWon(true);
      if (moves < bestScore || bestScore === 0) {
        setBestScore(moves + 1);
      }
    }
  }, [flipped, shuffledImages, moves, bestScore, setBestScore, setGameWon]);
  
  return (
    <>        
      <WinModal show={gameWon} onClose={() => setGameWon(false)} onReset={handleReset} currentScore={moves} bestScore={bestScore} />
      <div className="container">
        <Header handleReset={handleReset} setHardMode={setHardMode} hardMode={hardMode}/>
        <CardGrid shuffledImages={shuffledImages} flipped={flipped} handleFlip={handleFlip} />
        <div className="scoreboard">
          <span>Moves: {moves}{" "}</span>
          <span>Best Score: {bestScore}</span>
        </div>
      </div>
    </>
  )
}

export default App
