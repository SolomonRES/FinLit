import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Learning from './pages/Learning';
import CourseDetail from './pages/CourseDetail';
import Tools from './pages/Tools';
import Markets from './pages/Markets';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/learning/:id" element={<CourseDetail />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
