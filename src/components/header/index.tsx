import './header.css';

interface HeaderProps {
  handleReset: () => void;
  hardMode: boolean;
  setHardMode: (hardMode: boolean) => void;
}

const tooltip = 'All cards will be flipped back if on a wrong match';

const  Header: React.FC<HeaderProps> = ( {handleReset, setHardMode, hardMode}) => {
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
        />
        <label htmlFor="selectDifficulty" title={tooltip}>Hard Mode</label>
        </span>
      </div>
    </header>
  );
};

export default Header;