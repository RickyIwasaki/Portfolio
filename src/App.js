import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Resume from './pages/Resume/Resume';
import Contacts from './pages/Contacts/Contacts';
import Home from './pages/home/home';
import Beliefs from './pages/Beliefs/Beliefs';
import Footer from './components/Footer/Footer';
import { RateLimitProvider } from './components/RateLimit/RateLimitContext';
import RateLimitAlert from './components/RateLimit/RateLimitAlert';

function App() {
  return (
    <RateLimitProvider>
      <Router>
        <div className="App">
          <div className="main-content">
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/beliefs">Beliefs</Link></li>
                <li><Link to="/resume">Resume</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/beliefs" element={<Beliefs />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
            
            <RateLimitAlert />
            <Footer />
          </div>
        </div>
      </Router>
    </RateLimitProvider>
  );
}

export default App;
