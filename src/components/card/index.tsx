import './card.css';
import DogSVG from '../../assets/dog.svg';

interface CardProps {
    image: {
      id: string; // Dog breed
      image: string; // File location of the image
      uniqueId: string; // Unique identifier for the card
    };
    flipped: boolean; // Boolean to check if the card is flipped
    handleFlip: (uniqueId: string, id: string) => void; // Function to handle flip
  }

const Card = ({ image, flipped, handleFlip }: CardProps) => {
    return (
    <div
              key={image.id}
              className={`card ${flipped ? 'flipped' : ''}`}
              onClick={() => { if (!flipped) { handleFlip(image.uniqueId, image.id)}}}
              >
                <div className="card-inner">
                  {!flipped ? (
                  <div className="card-front">
                     <img src={DogSVG} alt="Dog" width="100" height="100" />
                  </div>
                  ) : (
                  <div className="card-back">
                    <img
                      src={image.image}
                      alt={image.uniqueId}
                    />
                  </div>
                  )}
                </div>
            </div>
)
};

export default Card;