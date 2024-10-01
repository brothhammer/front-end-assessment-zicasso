import { useState, useEffect, useCallback } from 'react'
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
  const [flipped, setFlipped] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState<string[]>([]);
  const [shuffledImages, setShuffledImages] = useState<{ id: string, image: string, uniqueId: string }[]>([]);
  const [isFlippingAllowed, setIsFlippingAllowed] = useState(true);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [hardMode, setHardMode] = useState(false);

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

  // shuffle the images on component mount
  useEffect(() => {
    shuffleImages();
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
  }, [flipped, hardMode]);

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
  }, [flipped, shuffledImages, moves, bestScore]);
  
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
