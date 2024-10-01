import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Header from './components/header'
import { imagesArray } from './assets/constants'
import CardGrid from './components/card-grid'
import WinModal from './components/win-modal'
import useLocalStorageState from './hooks/useLocalStorageState'

// shuffle the array of images
const shuffleArray = (array: Array<{ id: string; image: string }>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// take the id of the image and format it to a readable name
const formattedName = (str: string) : string => {
  return str
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


/**
 * The main App component.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  const [flipped, setFlipped] = useLocalStorageState<string[]>('flipped', []);
  const [currentTurn, setCurrentTurn] = useLocalStorageState<string[]>('currentTurn', []);
  const [shuffledImages, setShuffledImages] = useLocalStorageState<{ id: string, image: string, uniqueId: string }[]>('shuffledImages', []);
  const [isFlippingAllowed, setIsFlippingAllowed] = useState(true);
  const [moves, setMoves] = useLocalStorageState<number>('moves', 0);
  const [bestScore, setBestScore] = useLocalStorageState<number>('bestScore', 0);
  const [gameWon, setGameWon] = useLocalStorageState<boolean>('gameWon', false);
  const [hardMode, setHardMode] = useLocalStorageState<boolean>('hardMode', false);
  const [matchedBreed, setMatchedBreed] = useState<string | null>(null);

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
        // set the matched breed to display it on the screen for a short time
        setMatchedBreed(currentTurn[0]);
        setTimeout(() => {
          setMatchedBreed(null);
        }, 2000);
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

  // check if the cards match
  useEffect(() => {
    checkMatch(currentTurn);
  }, [currentTurn, checkMatch]);

  // check if the game is won
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
        <Header handleReset={handleReset} setHardMode={setHardMode} hardMode={hardMode} moves={moves} />
        <div className="matched-breed">{formattedName(matchedBreed || "") || ""}</div>
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
