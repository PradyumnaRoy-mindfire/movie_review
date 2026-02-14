import FavouriteMovieCard from './FavouriteMovieCard';

const DropZone = ({
  title,
  movies,
  icon,
  onDragStart,
  onDrop,
  onDragOver,
  onDragEnd,
}) => {
  return (
    <>
      {/* favourite div */}
      <div
        className="flex-1 px-4 bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg shadow-md m-4 border-2 border-dashed transition-all sm:min-h-[150px] md:min-h-[200px] lg:min-h-[300px] hover:border-solid hover:border-orange-400"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <h1 className="text-2xl text-bold mt-3">
          {icon}
          {title}
          <span className="text-sm text-neutral-500 ml-1">
            ({movies?.length})
          </span>
        </h1>

        <div className="space-y-3">
          {movies.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Drag movies here</p>
            </div>
          ) : (
            movies.map((movie) => (
              <FavouriteMovieCard
                key={movie.id}
                movie={movie}
                onDragStart={() => onDragStart(movie)}
                onDragEnd={onDragEnd}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default DropZone;
