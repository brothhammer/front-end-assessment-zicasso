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

  /**
 * Card component represents a single card in the memory game.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.image - The image object containing id, image, and uniqueId.
 * @param {string} props.image.id - The dog breed.
 * @param {string} props.image.image - The file location of the image.
 * @param {string} props.image.uniqueId - The unique identifier for the card.
 * @param {boolean} props.flipped - Boolean to check if the card is flipped.
 * @param {function} props.handleFlip - Function to handle the flip action.
 * @returns {JSX.Element} The rendered card component.
 */
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