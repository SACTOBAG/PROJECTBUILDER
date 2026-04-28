import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Pantry from './pages/Pantry';
import BrewLog from './pages/BrewLog';
import Learn from './pages/Learn';
import Suggestions from './pages/Suggestions';
import Improve from './pages/Improve';
import Share from './pages/Share';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pantry" element={<Pantry />} />
        <Route path="log" element={<BrewLog />} />
        <Route path="learn" element={<Learn />} />
        <Route path="suggestions" element={<Suggestions />} />
        <Route path="improve" element={<Improve />} />
        <Route path="share" element={<Share />} />
      </Route>
    </Routes>
  );
}
