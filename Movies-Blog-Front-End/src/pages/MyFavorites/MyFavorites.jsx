import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import UserContext from '../../contexts/UserContext';
import { index } from '../../services/movieService';
import './MyFavorites.css';

const MyFavorites = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const movies = await index();

        const filteredFavorites = movies.filter(
          (movie) =>
            movie.likes &&
            movie.likes.some(
              (likeId) => likeId.toString() === user._id.toString()
            )
        );

        setFavoriteMovies(filteredFavorites);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <NavBar />

      <main className="my-favorites-page">
        <section className="my-favorites-container">
          <h1 className="my-favorites-title">My Favorite Movies</h1>

          {favoriteMovies.length > 0 ? (
            <div className="my-favorites-grid">
              {favoriteMovies.map((movie) => (
                <Link
                  to={`/movies/${movie._id}`}
                  key={movie._id}
                  className="my-favorite-card-link"
                >
                  <article className="my-favorite-card">
                    {movie.image ? (
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="my-favorite-card-image"
                      />
                    ) : (
                      <div className="my-favorite-card-no-image">No Image</div>
                    )}

                    <div className="my-favorite-card-content">
                      <h2 className="my-favorite-card-title">{movie.title}</h2>
                      <p className="my-favorite-card-category">{movie.category}</p>
                      <p className="my-favorite-card-rating">
                        Rating: {movie.rating}
                      </p>
                      <p className="my-favorite-card-likes">
                        Likes: {movie.likes?.length || 0}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="my-favorites-empty">
              You have not liked any movie reviews yet.
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default MyFavorites;