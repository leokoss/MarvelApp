import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import decoration from '../../resources/img/vision.png';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img src={decoration} alt="vision" className="bg-decoration" />
      </main>
    </div>

  );
}

export default App;
