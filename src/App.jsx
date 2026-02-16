import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavouriteProvider } from './context/FavouriteContext';
import LoadingEffect from './components/animations/LoadingEffect';
import Layout from './components/Layout';
import ROUTES from './constants/route';

const Home = lazy(() => import('./pages/Home'));
const Favourite = lazy(() => import('./pages/Favourite'));
const ErrorNotFound = lazy(() => import('./pages/ErrorNotFound'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'))

function App() {
  return (
    <>
      <FavouriteProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingEffect />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.FAVOURITE} element={<Favourite />} />
                <Route path={ROUTES.MOVIEDETAILS} element={<MovieDetails/>}/>
              </Route>
              <Route path={ROUTES.NOTFOUND} element={<ErrorNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FavouriteProvider>
    </>
  );
}

export default App;
