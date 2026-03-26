import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import UserContext from '../../contexts/UserContext';
import { index } from '../../services/movieService';
import './MyReviews.css';

const MyReviews = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    const fetchMyReviews = async () => {
      try {
        const movies = await index();

        const filteredMovies = movies.filter(
          (movie) =>
            movie.owner &&
            movie.owner._id &&
            movie.owner._id === user._id
        );

        setMyMovies(filteredMovies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyReviews();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <NavBar />

      <main className="my-reviews-page">
        <section className="my-reviews-container">
          <h1 className="my-reviews-title">My Reviews</h1>

          {myMovies.length > 0 ? (
            <div className="my-reviews-grid">
              {myMovies.map((movie) => (
                <Link
                  to={`/movies/${movie._id}`}
                  key={movie._id}
                  className="my-review-card-link"
                >
                  <article className="my-review-card">
                    {movie.image ? (
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="my-review-card-image"
                      />
                    ) : (
                      <div className="my-review-card-no-image">No Image</div>
                    )}

                    <div className="my-review-card-content">
                      <h2 className="my-review-card-title">{movie.title}</h2>
                      <p className="my-review-card-category">{movie.category}</p>
                      <p className="my-review-card-rating">Rating: {movie.rating}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="my-reviews-empty">You have not created any reviews yet.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default MyReviews;