import { fetchMovieDetails } from '../services/movieApiService';

const MovieDetails = ({ movie }) => {
  return (
    <>
      <div>{console.log(fetchMovieDetails(movie.id))}</div>
    </>
  );
};

export default MovieDetails;
