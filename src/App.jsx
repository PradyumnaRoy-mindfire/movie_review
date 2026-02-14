import './App.css';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavouriteProvider } from './context/FavouriteContext';
import LoadingEffect from './components/animations/LoadingEffect';
import Layout from './components/Layout';
import ROUTES from './constants/route';

import Home from './pages/Home';
import Favourite from './pages/Favourite';

function App() {
  return (
    <>
      <FavouriteProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingEffect />}>
            <Layout>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.FAVOURITE} element={<Favourite />} />
              </Routes>
            </Layout>
          </Suspense>
        </BrowserRouter>
      </FavouriteProvider>
    </>
  );
}

export default App;
