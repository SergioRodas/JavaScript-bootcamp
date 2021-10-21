import { useState } from "react"
import ReactDOM from 'react-dom'
import './index.css'

const WarningNotUsed = () => {
    return <h4>Todavía no se ha usado el contador</h4>
}

const ListOfClicks = ({clicks}) => {
    return <p>{clicks.join(', ')}</p>
}

const INITIAL_COUNTER_STATE = {
    left: 0,
    right: 0,
    message: 'Mensaje en el estado'
}

const App = () => {
    // const [left, setLeft] = useState(0)
    // const [right, setRight] = useState(0)

    // Objects can be handled in one state. (Better to have it separate)
    const [counters, setCounters] = useState(INITIAL_COUNTER_STATE)

    const [clicks, setClicks] = useState([])

    const handleClickLeft = () => {
        
        setCounters({
            ...counters, // Spread operator: Keep the previous state properties, just change the ones mentioned below
            left: counters.left + 1
        })
        setClicks(prevClicks =>  ([...prevClicks, 'L']))
    }
    
    const handleClickRight = () => {
        setCounters({
            ...counters,
            right: counters.right + 1
        })
        setClicks(prevClicks =>  ([...prevClicks, 'R']))
    }

    const handleReset = () => {
        setCounters(INITIAL_COUNTER_STATE)
        setClicks([])
    }

    return(
        <div>
            {counters.left}
            <button onClick={handleClickLeft}>
                Left
            </button>
            <button onClick={handleClickRight}>
                Right
            </button>
            {counters.right}
            <button onClick={handleReset}>Reset</button>
            <p>Clicks totales: {clicks.length}</p>
            {clicks.length === 0 ? <WarningNotUsed/> : <ListOfClicks clicks={clicks}/>}
        </div>
    )
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App/>, rootElement)