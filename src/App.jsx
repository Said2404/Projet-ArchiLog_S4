import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
  const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};

return (
  <div>
    <header>
      <div className="menu-button" onClick={toggleMenu}>
        <span>☰</span>
      </div>
    </header>

    {/* Menu déroulant */}
    <div className={`menu-container ${menuOpen ? 'active' : ''}`}>
      <button>Voir les transactions</button>
    </div>
  </div>
);

}

export default App;
