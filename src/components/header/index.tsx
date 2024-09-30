import './header.css';

interface HeaderProps {
  handleReset: () => void;
}

const  Header: React.FC<HeaderProps> = ( {handleReset}) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Match the Dogos</h1>
        <button onClick={handleReset}>Reset</button>
      </div>
    </header>
  );
};

export default Header;