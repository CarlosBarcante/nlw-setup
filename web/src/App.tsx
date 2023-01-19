import './styles/global.css';
import Habit from './components/Habit';

function App() {

  return (
    <div>
      <h1>Hello World!</h1>
      <Habit completed={3} />
      <Habit completed={10} />
    </div>
  )
}

export default App;
