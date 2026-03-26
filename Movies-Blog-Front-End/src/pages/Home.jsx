import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import { index } from '../services/movieService';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await index();
        setMovies(Array.isArray(moviesData) ? moviesData : []);
      } catch (error) {
        console.log(error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  const recommendedMovie = movies.length > 0 ? movies[0] : null;

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortType === 'rating') {
      return b.rating - a.rating; // มาก → น้อย
    }

    if (sortType === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    return 0;
  });


  return (
    <main className="home-page">

      <NavBar />

      <section className="hero-section">
        {recommendedMovie ? (
          <Link to={`/movies/${recommendedMovie._id}`} className="hero-card">
            {recommendedMovie.image ? (
              <img
                src={recommendedMovie.image}
                alt={recommendedMovie.title}
                className="hero-image"
              />
            ) : (
              <div className="hero-image-placeholder">Recommended Movie</div>
            )}

            <div className="hero-content">
              <h2>{recommendedMovie.title}</h2>
              <p>{recommendedMovie.category}</p>
              <p>Rating: {recommendedMovie.rating}</p>
            </div>
          </Link>
        ) : (
          <div className="hero-card">
            <div className="hero-image-placeholder">Recommended Movie</div>
          </div>
        )}
      </section>

      <section className="movies-section">
        <div className="movies-section-header">
          <div>
            <h2>Latest Reviews</h2>
            <p>New movie reviews from the community</p>
          </div>

          <select
            className="sort-button"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="rating">⭐ Rating</option>
            <option value="newest">🆕 Newest</option>
          </select>

        </div>

        <div className="movies-grid">
          {sortedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        
      </section>
    </main>
  );
};

export default Home;