import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Resume from './pages/Resume/Resume';
import Contacts from './pages/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import { RateLimitProvider } from './context/RateLimitContext';
import RateLimitAlert from './components/RateLimitAlert';

// Home component 
const Home = () => (
  <div>
    <h1>Ricky Iwasaki</h1>
    <p>Welcome to my portfolio!</p>
  </div>
);

// Resume page will be imported from a separate file once we create it

function App() {
  return (
    <RateLimitProvider>
      <Router>
        <div className="App">
          <div className="main-content">
            <nav className="main-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/resume">Resume</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
            
            {/* Rate limit alert component */}
            <RateLimitAlert />
          </div>
          
          {/* Footer component */}
          <Footer />
        </div>
      </Router>
    </RateLimitProvider>
  );
}

export default App;
