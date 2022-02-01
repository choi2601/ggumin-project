import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FurnitureViewPage from './pages/FurnitureView/FurnitureViewPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FurnitureViewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
