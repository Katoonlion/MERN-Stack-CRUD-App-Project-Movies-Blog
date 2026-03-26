import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} className="movie-card">
      {movie.image ? (
        <img
          src={movie.image}
          alt={movie.title}
          className="movie-card-image"
        />
      ) : (
        <div className="movie-card-image-placeholder">No Image</div>
      )}

      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <p>{movie.category}</p>
        <p>Rating: {movie.rating}</p>
      </div>
    </Link>
  );
};

export default MovieCard;