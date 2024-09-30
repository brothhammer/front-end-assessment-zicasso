import { useState } from 'react'
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

const App = () => {
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});

  const handleFlip = (id: string) => {
    setFlipped(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };


  return (
      <div className="container">
        <Header />
        <div className="images">
          {imagesArray.map((image) => (
            <Card image={image} flipped={flipped} handleFlip={handleFlip} />
            // <div
            //   key={image.id}
            //   className={`card ${flipped[image.id] ? 'flipped' : ''}`}
            //   onClick={() => handleFlip(image.id)}
            //   >
            //     <div className="card-inner">
            //       {!flipped[image.id] ? (
            //       <div className="card-front">
            //         <p>front of card</p>
            //       </div>
            //       ) : (
            //       <div className="card-back">
            //         <img
            //           src={image.image}
            //           alt={image.id}
            //         />
            //       </div>
            //       )}
            //     </div>
            // </div>
          ))}
        </div>
      </div>
  )
}

export default App
