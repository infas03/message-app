import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/routes';
import useListenMessages from './reducers/listenMessages';

function App() {
  useListenMessages()

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
