import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const rootElement = document.getElementById("root");

const App = (props) => {
  const [counterValue, setCounterValue] = useState(0)

  const handleIncreaseCounterClick = () => {
    setCounterValue(counterValue + 1)
  }
  const handleDecreaseCounterClick = () => {
    setCounterValue(counterValue - 1)
  }

  const handleResetCounterClick = () => {
    setCounterValue(0)
  }

  const isEven = counterValue % 2 === 0
  const messageIsEven = isEven ? "Es par" : "Es impar"

  return (
    <div>
      <p>El valor del contador es:</p>
      <h1>{counterValue}</h1>
      <p>{messageIsEven}</p>
      <button onClick={handleIncreaseCounterClick}>
      Incrementar
      </button>
      <button onClick={handleDecreaseCounterClick}>
      Decrementar
      </button>
      <button onClick={handleResetCounterClick}>
      Reset
      </button>
    </div>
  )
}



ReactDOM.render(
    <App />,
  rootElement
);
