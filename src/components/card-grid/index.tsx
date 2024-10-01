import React from 'react';
import './card-grid.css';
import Card from '../card';

interface CardGridProps {
  shuffledImages: { id: string, image: string, uniqueId: string }[];
  flipped: string[];
  handleFlip: (uniqueId: string, id: string) => void;
}

/**
 * CardGrid component renders a grid of cards for the memory game.
 * 
 * @param {Object} props - The properties object.
 * @param {Object[]} props.shuffledImages - Array of shuffled image objects.
 * @param {string} props.shuffledImages[].id - The dog breed.
 * @param {string} props.shuffledImages[].image - The file location of the image.
 * @param {string} props.shuffledImages[].uniqueId - The unique identifier for the card.
 * @param {string[]} props.flipped - Array of uniqueIds of flipped cards.
 * @param {function} props.handleFlip - Function to handle the flip action.
 * @returns {JSX.Element} The rendered card grid component.
 */
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
