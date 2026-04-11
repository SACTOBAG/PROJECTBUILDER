import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BrewGuide from './pages/BrewGuide';
import BrewLog from './pages/BrewLog';
import Pantry from './pages/Pantry';
import Recipes from './pages/Recipes';
import Planner from './pages/Planner';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="brew/:methodId?" element={<BrewGuide />} />
        <Route path="log" element={<BrewLog />} />
        <Route path="pantry" element={<Pantry />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="planner" element={<Planner />} />
      </Route>
    </Routes>
  );
}
