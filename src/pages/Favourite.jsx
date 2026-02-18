import { useContext, useState, useEffect, useCallback } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';
import DropZone from '../components/addToFavourite/DropZone';
import { Grip, AlarmClock, HeartPlus } from 'lucide-react';

const Favourite = () => {
  const { favourites } = useContext(FavouriteContext);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState(() => {
    const temp = localStorage.getItem('watchLaterMovies');
    return temp ? JSON.parse(temp) : [];
  });
  const [source, setSource] = useState(null);
  const [draggedMovie, setDraggedMovie] = useState(null);

  useEffect(() => {
    //filter the movies from  favourites to watchlater
    const filteredFavourites = favourites.filter(
      (fav) => !watchLaterMovies.some((watch) => watch.id === fav.id)
    );
    setFavouriteMovies(filteredFavourites);
  }, [favourites, watchLaterMovies]);

  const handleDragStart = useCallback((movie, source) => {
    setDraggedMovie(movie);
    setSource(source);
  }, []);

  //when the movie will be drop to any section
  const handleDrop = (destination) => (e) => {
    e.preventDefault();
    //if source,destination  is null
    if (source == null || destination == null || source === destination) {
      return;
    }

    //if destination is favourites, movie comes from watchLater to favourites
    if (destination == 'favourites') {
      setWatchLaterMovies((prev) =>
        prev.filter((movie) => movie.id !== draggedMovie.id)
      );
      setFavouriteMovies((prev) => [...prev, draggedMovie]);
      localStorage.setItem(
        'watchLaterMovies',
        JSON.stringify(
          watchLaterMovies.filter((movie) => movie.id !== draggedMovie.id)
        )
      );
    } else {
      //destination is watchLater, movie comes from favourites too watchLater
      setFavouriteMovies((prev) =>
        prev.filter((movie) => movie.id !== draggedMovie.id)
      );
      setWatchLaterMovies((prev) => [...prev, draggedMovie]);
      localStorage.setItem(
        'watchLaterMovies',
        JSON.stringify([...watchLaterMovies, draggedMovie])
      );
    }
    setDraggedMovie(null);
    setSource(null);
  };

  const handleDragEnd = useCallback(() => {
    setDraggedMovie(null);
    setSource(null);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-2">My Favourites</h1>
      <div className="flex justify-center mt-4 mx-5">
        <p className=" bg-gray-200 p-3 rounded-lg text-sm text-gray-700 w-full flex items-center">
          <Grip size={18} className="inline-block mr-2" />
          <span>
            <strong>Tip:</strong> Drag and drop movies between "Favourites" and
            "Watch Later" to organize your collection! Click on the Poster to
            see the movie details
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-1 mt-1 mx-1">
        <DropZone
          title="Favourites"
          movies={favouriteMovies}
          icon={
            <HeartPlus size={25} className="inline-block mr-2 text-red-500 " />
          }
          onDragStart={(movie) => handleDragStart(movie, 'favourites')}
          onDrop={handleDrop('favourites')}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        />

        <DropZone
          title="Watch Later"
          movies={watchLaterMovies}
          icon={
            <AlarmClock
              size={25}
              className="inline-block mr-2 text-amber-500"
            />
          }
          onDragStart={(movie) => handleDragStart(movie, 'watchLater')} //When start dragging an item.
          onDrop={handleDrop('watchLater')} // when release the dragged item over a drop zone.
          onDragOver={handleDragOver} // when drag something over a drop zone.
          onDragEnd={handleDragEnd} //When dragging stops , no matter where., when we drop it outside a valid area
        />
      </div>
    </>
  );
};

export default Favourite;
