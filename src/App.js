import './App.css';
import './components/Die.css'
import Die from './components/Die';
import React from 'react';
import Confetti from 'react-confetti'

function App() {
  const diceAmount = 10
  const [dice, setDice] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [maxScore, setMaxScore] = React.useState(localStorage.getItem('rolls') || 1000);

  React.useEffect(() => {
    let tempDice = []
    for (let i = 0; i < diceAmount; i++) {
      const randNum = Math.floor(Math.random() * diceAmount);
      tempDice[i] = {
        id: i,
        selected: false,
        value: randNum
      }
    }

    setDice(tempDice);
  }, [])

  React.useEffect(() => {
    localStorage.setItem('rolls', maxScore);
  }, [maxScore]);

  function generateDice() {
    let tempDice = []
    if (gameOver) {
      for (let i = 0; i < diceAmount; i++) {
        const randNum = Math.floor(Math.random() * diceAmount);
        tempDice[i] = {
          id: i,
          selected: false,
          value: randNum
        }
      }
      setGameOver(false);
      if (maxScore > score) {
        setMaxScore(score);
      }
      setScore(0);
    }
    else {
      for (let i = 0; i < diceAmount; i++) {
        const randNum = Math.floor(Math.random() * diceAmount);

        tempDice[i] = dice[i];
        if (!dice[i].selected) {
          tempDice[i].value = randNum;
        }

      }
      setScore(prevState => prevState + 1);
    }

    setDice(tempDice);
  }

  React.useEffect(() => {
    if (dice.length === 0) {
      return
    }
    let keepPlaying = false
    let dieNum
    for (const die of dice) {
      console.log("ABC")
      if (!die.selected) {
        keepPlaying = true
      }
      if (!dieNum) {
        dieNum = die.value
      }
      else if (dieNum !== die.value) {
        keepPlaying = true
      }
    };

    const isOver = !keepPlaying;
    if (isOver) {
      console.log("Set Game Over")
      setGameOver(true);
    }
  }, [dice]);

  function handleDieClick(id) {
    setDice(prevState => {
      let newDice = []
      prevState.forEach(prevDie => {
        if (prevDie.id === id) {
          newDice.push({
            ...prevDie,
            selected: !prevDie.selected
          })
        }
        else {
          newDice.push({ ...prevDie });
        }
      })
      return newDice
    });
  }

  return (
    <div className="App">
      <div className='dice-score' style={{color: score + 10 < maxScore ? "#48754f" : score + 5 < maxScore ? "#baaf4c" : score + 3 < maxScore ? "#ba6932" : "#912121"}}>Rolls: {score}</div>
      {gameOver && <Confetti />}
      {gameOver ? <div className='dice-end-score'>The Best Score: {maxScore}<br />Your Score: {score}</div>
      :
        <div className='dice-text'>
        <h1>The Tenzies Game</h1>
        <p>Roll until all dice are same. Click each die to freeze it at its current value between rolls. Lower the score, better the result.</p>
      </div>
      }
      <div className='dice-container'>
        {dice.map(die => {
          return <Die key={die.id} value={die.value} selected={die.selected} handleToggle={() => handleDieClick(die.id)} />
        })}
      </div>
      <button className='dice-button' onClick={generateDice}>{gameOver ? "PLAY AGAIN" : "ROLL DICE"}</button>
    </div>
  );
}

export default App;
