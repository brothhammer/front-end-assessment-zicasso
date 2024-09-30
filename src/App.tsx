import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Header from './components/header'
import { imagesArray } from './assets/constants'
import CardGrid from './components/card-grid'

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
          setFlipped(flipped.slice(0, -2));
          setCurrentTurn([]);
          setIsFlippingAllowed(true);
        }, 1000);
      }
    }
  }, [flipped]);

  useEffect(() => {
    checkMatch(currentTurn);
  }, [currentTurn, checkMatch]);
  

  return (
      <div className="container">
        <Header handleReset={handleReset} />
        <CardGrid shuffledImages={shuffledImages} flipped={flipped} handleFlip={handleFlip} />
      </div>
  )
}

export default App
