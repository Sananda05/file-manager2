import './App.css';
import FileManager from './page/FileManager';
import Navbar from './component/navbar/Navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className='navbar_container'>
        <Navbar/>
        </div>
        <div className='body_container'>
        <FileManager/>
        </div>
      </header>
    </div>
  );
}

export default App;
