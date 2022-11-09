import { useState, useEffect } from 'react';
import './App.css';
import cards from './cards';

const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardArray, setCardArray] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  function shuffle(array) {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    setCardArray([...shuffledArray]);
  }

  function checkClickedCard(card) {
    if (clickedCards.includes(card)) {
      setClickedCards([]);
      setCurrentScore(0);
    } else {
      setClickedCards([...clickedCards, card]);
      setCurrentScore(currentScore + 1);
    }
  }

  useEffect(() => {
    setCardArray(cards);
    console.log('Initial load.');
  }, []) // On initial page load.
  
  useEffect(() => {
    console.log('Array change.');
  }, [cardArray]) // Every time the array changes.

  useEffect(() => {
    console.log(clickedCards);
  }, [clickedCards]) // Every time the array changes.

  useEffect(() => {
    if (currentScore > 0 && highScore < currentScore) {
      setHighScore(currentScore);
    }
  }, [currentScore, highScore]) // Every time the array changes.

  return (
    <div className="App">
      <div className='Header'>
        <div className='title'>Memory Game</div>
        <div className='scores'>
          <div>Score: {currentScore}</div>
          <div>High Score: {highScore}</div>
        </div>
      </div>
      <div className='Main'>
        <div className='card-container'>
          {cardArray.map((card) =>
            <div className='card'
              key={card.name}
              onClick={() => { 
                shuffle(cardArray);
                checkClickedCard(card.name);
                }}>
              <img className='card-image' src={card.image} alt={card.name} id='cardImg' />
              <label>{card.name}</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
