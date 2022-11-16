import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AllPage from './components/AllPage';
import PostPage from './components/PostPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/all' element={<AllPage />} />
      <Route path='' element={<Navigate to='/all' replace />} />
      <Route path='*' element={<PostPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
