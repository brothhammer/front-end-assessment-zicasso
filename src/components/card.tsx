interface CardProps {
    image: {
      id: string; // Dog breed
      image: string; // File location of the image
    };
    flipped: { [key: string]: boolean }; // Object to track flipped state
    handleFlip: (id: string) => void; // Function to handle flip
  }

const Card = ({ image, flipped, handleFlip }: CardProps) => {
    return (
    <div
              key={image.id}
              className={`card ${flipped[image.id] ? 'flipped' : ''}`}
              onClick={() => handleFlip(image.id)}
              >
                <div className="card-inner">
                  {!flipped[image.id] ? (
                  <div className="card-front">
                    <p>front of card</p>
                  </div>
                  ) : (
                  <div className="card-back">
                    <img
                      src={image.image}
                      alt={image.id}
                    />
                  </div>
                  )}
                </div>
            </div>
)
};

export default Card;