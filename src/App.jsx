import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil/Accueil';
import Apropos from './pages/Apropos/Apropos';
import Services from './pages/Services/Services';
import Projets from './pages/Projets/Projets';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projets" element={<Projets />} />
      </Routes>
    </Router>
  );
}

export default App;
