import ShowTrendingMovies from '../components/homePageMovieCategories/ShowTrendingMovies';
import ShowUpcomingMovies from '../components/homePageMovieCategories/ShowUpcomingMovies';
import ShowTopRatedMovies from '../components/homePageMovieCategories/ShowTopRatedMovies';
import ShowPlayingMovies from '../components/homePageMovieCategories/ShowPlayingMovies';

const Home = () => {
  return (
    <>
      <div className=" bg-linear-to-br from-blue-150 via-indigo-50 to-purple-50 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-8 pb-8">
        <ShowTrendingMovies />

        <ShowUpcomingMovies />

        <ShowTopRatedMovies />

        <ShowPlayingMovies />
      </div>
    </>
  );
};

export default Home;
