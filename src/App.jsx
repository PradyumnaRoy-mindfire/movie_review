import './App.css';
import ROUTES from './constants/route';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoadingEffect from './components/animations/LoadingEffect';
import Layout from './components/Layout';
import Home from './pages/Home';
import { FavouriteProvider } from './context/FavouriteContext';

function App() {
  return (
    <>
      <FavouriteProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingEffect />}>
            <Layout>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
              </Routes>
            </Layout>
          </Suspense>
        </BrowserRouter>
      </FavouriteProvider>
    </>
  );
}

export default App;
