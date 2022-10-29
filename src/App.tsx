import './components/navbar/navbar.css'
import './App.css';
import './pages/styles/home.css'
import './pages/styles/games.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Games from './pages/games';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
          {<Home
          />
          } />
        <Route path="/games" element=
          {<Games
          />
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
