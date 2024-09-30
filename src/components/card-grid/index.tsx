import React from 'react';
import './card-grid.css';
import Card from '../card';

interface CardGridProps {
  shuffledImages: { id: string, image: string, uniqueId: string }[];
  flipped: string[];
  handleFlip: (uniqueId: string, id: string) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ shuffledImages, flipped, handleFlip }) => {
  return (
    <div className="images">
      {shuffledImages.map((image) => (
        <Card
          key={image.uniqueId}
          image={image}
          flipped={flipped.includes(image.uniqueId)}
          handleFlip={handleFlip}
        />
      ))}
    </div>
  );
};

export default CardGrid;
