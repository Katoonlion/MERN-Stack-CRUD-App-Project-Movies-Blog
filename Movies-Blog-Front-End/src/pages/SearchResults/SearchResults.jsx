import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import MovieCard from '../../components/MovieCard';
import { index } from '../../services/movieService';
import './SearchResults.css';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q') || '';

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <NavBar />

      <main className="search-results-page">
        <section className="search-results-container">
          <div className="search-results-header">
            <h1 className="search-results-title">Search Results</h1>
            {query ? (
              <p className="search-results-text">
                Results for: <strong>{query}</strong>
              </p>
            ) : (
              <p className="search-results-text">Please enter a movie title.</p>
            )}
          </div>

          {query && filteredMovies.length > 0 ? (
            <div className="search-results-grid">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          ) : query ? (
            <p className="search-results-empty">No movies found.</p>
          ) : (
            <div className="search-results-home-link-box">
              <Link to="/" className="search-results-home-link">
                Back to Home
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default SearchResults;