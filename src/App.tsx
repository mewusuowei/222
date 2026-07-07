import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CalculationPage from './pages/CalculationPage';
import ExamplesPage from './pages/ExamplesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculation" element={<CalculationPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
