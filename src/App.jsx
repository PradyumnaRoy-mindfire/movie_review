import './App.css';
import ROUTES from './constants/route';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoadingEffect from './components/animations/LoadingEffect';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingEffect />}>
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
            </Routes>
          </Layout>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
