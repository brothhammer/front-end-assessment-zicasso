import './header.css';

interface HeaderProps {
  handleReset: () => void;
  hardMode: boolean;
  setHardMode: (hardMode: boolean) => void;
  moves: number;
}

const tooltip = 'All cards will be flipped back on a wrong match';

/**
 * Header component for the Match the Dogos game.
 * 
 * @param {Object} props - The properties object.
 * @param {function} props.handleReset - Function to reset the game.
 * @param {boolean} props.hardMode - Boolean indicating if hard mode is enabled.
 * @param {function} props.setHardMode - Function to toggle hard mode.
 * @param {number} props.moves - The number of moves made in the game.
 * @returns {JSX.Element} The rendered header component.
 */
const  Header: React.FC<HeaderProps> = ( {handleReset, setHardMode, hardMode, moves}) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Match the Dogos</h1>
        <span>
        <button className='button' onClick={handleReset}>Reset</button>
        <input
          type="checkbox"
          id="selectDifficulty"
          name="hardMode"
          value="hardMode" 
          onClick={() => setHardMode(!hardMode)}
          title={tooltip}
          disabled={moves > 0}
        />
        <label htmlFor="selectDifficulty" title={tooltip}>Hard Mode</label>
        </span>
      </div>
    </header>
  );
};

export default Header;