import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Header from './components/header'
import australianShepherd from './assets/australian-shepherd.jpg'
import borderCollie from './assets/border-collie.jpg'
import austrailianCattleDog from './assets/australian-cattledog.jpg'
import labrador from './assets/labrador.jpg'
import rhodesianRidgeback from './assets/rhodesian-ridgeback.jpg'
import shibaInu from './assets/shiba-inu.jpg'
import weimaraner from './assets/weimaraner.jpg'
import alaskanHusky from './assets/alaskan-husky.jpg'
import austrailianKelpie from './assets/australian-kelpie.jpg'
import corgi from './assets/corgi.jpg'
import boxer from './assets/boxer.jpg'
import novaScotiaDuckTollingRetriever from './assets/nova-scotia-duck-tolling-retriever.jpg'
import Card from './components/card'

const imagesArray = [
  { 
    id: "austrailian-shepherd",
    image: australianShepherd,
  },
  {
    id: "border-collie",
    image: borderCollie,
  },
  {
    id: "australian-cattle-dog",
    image: austrailianCattleDog,
  },
  {
    id: "labrador",
    image: labrador,
  },
  {
    id: "rhodesian-ridgeback",
    image: rhodesianRidgeback,
  },
  {
    id: "shiba-inu",
    image: shibaInu,
  },
  {
    id: "weimaraner",
    image: weimaraner,
  },
  {
    id: "alaskan-husky",
    image: alaskanHusky,
  },
  {
    id: "australian-kelpie",
    image: austrailianKelpie,
  },
  {
    id: "corgi",
    image: corgi,
  },
  {
    id: "boxer",
    image: boxer,
  },
  {
    id: "nova-scotia-duck-tolling-retriever",
    image: novaScotiaDuckTollingRetriever,
  },
]

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
        <div className="images">
          {shuffledImages.map((image) => (
            <Card image={image} flipped={flipped.includes(image.uniqueId)} handleFlip={handleFlip} key={image.uniqueId} />
          ))}
        </div>
      </div>
  )
}

export default App
