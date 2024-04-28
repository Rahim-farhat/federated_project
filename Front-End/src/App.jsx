import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { CreateOpp } from './pages/createOpp';
import { Auth } from './pages/auth';
import { SavedOpp } from './pages/savedOpp';
import { Navbar } from './components/navbar';
import './App.css';
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/createOpp" element={<CreateOpp />}></Route>
          <Route path="/savedOpp" element={<SavedOpp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
