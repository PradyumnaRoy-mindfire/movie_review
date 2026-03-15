import MovieCategory from '../components/homePageMovieCategories/MovieCategory';
import {
  useTrendingMovies,
  useTopRatedMovies,
  useUpcomingMovies,
  useNowPlayingMovies,
} from '../utils/MoviesData';
import {
  ChartNoAxesCombined,
  Star,
  CalendarFold,
  Clapperboard,
} from 'lucide-react';
import { useCallback } from 'react';

const TrendingBadge = () => (
  <span className="absolute left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
    Trending
  </span>
);

const TopRatedBadge = () => (
  <span className="absolute left-2 z-10 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
    Top Rated
  </span>
);

const UpcomingBadge = () => (
  <span className="absolute left-2 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
    Upcoming
  </span>
);

const NowPlayingBadge = () => (
  <span className="absolute left-2 z-10 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-l-2xl">
    Now Playing
  </span>
);

const Home = () => {
  const trendingData = useTrendingMovies();
  const topRatedData = useTopRatedMovies();
  const upcomingData = useUpcomingMovies();
  const nowPlayingData = useNowPlayingMovies();

  const trendingBadge = useCallback(() => {
    return <TrendingBadge />;
  }, []);
  const topRatedBadge = useCallback(() => {
    return <TopRatedBadge />;
  }, []);
  const upcomingBadge = useCallback(() => {
    return <UpcomingBadge />;
  }, []);
  const nowPlayingBadge = useCallback(() => {
    return <NowPlayingBadge />;
  }, []);

  return (
    <section
      aria-label="Movie categories"
      className="bg-linear-to-br from-blue-150 via-indigo-50 to-purple-50 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-6  px-2 md:px-4 lg:px-8 pb-8"
    >
      <MovieCategory
        title="Top 10 Trending Movies"
        icon={ChartNoAxesCombined}
        {...trendingData}
        renderBadge={trendingBadge}
      />
      <MovieCategory
        title="Top 10 Upcoming Movies"
        icon={CalendarFold}
        {...upcomingData}
        renderBadge={upcomingBadge}
      />
      <MovieCategory
        title="Top 10 Rated Movies"
        icon={Star}
        {...topRatedData}
        renderBadge={topRatedBadge}
      />
      <MovieCategory
        title="Now Playing in Theaters"
        icon={Clapperboard}
        {...nowPlayingData}
        renderBadge={nowPlayingBadge}
      />
    </section>
  );
};

export default Home;
