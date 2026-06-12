import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotreHistoire from './pages/notre-histoire/NotreHistoire';
import Menu from './pages/menu/Menu';
import Galerie from './pages/galerie/Galerie';
import Contact from './pages/contact/Contact';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notre-histoire" element={<NotreHistoire />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
