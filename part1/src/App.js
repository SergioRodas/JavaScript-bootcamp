import './App.css';
import Mensaje from './Mensaje';

const Description = () => {
  return <p>Esta es la app del curso de React</p>
}

const App = () => {
  return (
    <div className="App">
      <Mensaje color='red' msg='Estamos trabajando'/>
      <Mensaje color='green' msg='En un curso'/>
      <Mensaje color='yellow' msg='De React'/>
      <Description/>
    </div>
  );
}

export default App;
