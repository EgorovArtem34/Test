import MainPage from './pages/MainPage/MainPage';
import './styles/index.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </>
);

export default App;
