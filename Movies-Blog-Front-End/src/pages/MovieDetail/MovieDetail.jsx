import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { show, index, deleteMovie, createComment, updateComment, deleteComment, toggleLike } from '../../services/movieService';
import NavBar from '../../components/NavBar';
import UserContext from '../../contexts/UserContext';
import './MovieDetail.css';

const MovieDetail = () => {
  const { user } = useContext(UserContext);
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [ownerMovies, setOwnerMovies] = useState([]);
  const [commentFormData, setCommentFormData] = useState({text: '',});

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await show(movieId);
        setMovie(movieData);

        const allMovies = await index();

        const filteredOwnerMovies = allMovies.filter(
          (item) =>
            item.owner &&
            movieData.owner &&
            item.owner._id === movieData.owner._id &&
            item._id !== movieData._id
        );

        setOwnerMovies(filteredOwnerMovies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleDelete = async () => {
    try {
      await deleteMovie(movieId);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (evt) => {
    setCommentFormData({
      ...commentFormData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleCommentSubmit = async (evt) => {
    evt.preventDefault();

    if (!commentFormData.text.trim()) return;

    try {
      const updatedMovie = await createComment(movieId, commentFormData);
      setMovie(updatedMovie);
      setCommentFormData({ text: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const updatedMovie = await updateComment(movieId, commentId, {
        text: editText,
      });

      setMovie(updatedMovie);
      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const updatedMovie = await deleteComment(movieId, commentId);
      setMovie(updatedMovie);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    try {
      const updatedMovie = await toggleLike(movieId);
      setMovie(updatedMovie);
    } catch (error) {
      console.log('toggle like error:', error);
    }
  };

  const isLiked = user && movie?.likes?.some(
    (likeId) => likeId.toString() === user._id.toString()
  );

  if (!movie) return <h1>Loading...</h1>;

  return (
    <>
      <NavBar />

      <main className="movie-detail-page">
        <section className="movie-detail-container">
          <div className="movie-detail-grid">
            <div className="movie-main-column">
              <div className="movie-detail-title-box">
                <h1 className="movie-detail-title">{movie.title}</h1>
              </div>

              <div className="movie-detail-meta-box">
                <p>Category: {movie.category}</p>
                <p>Rating: {movie.rating}</p>
                <p>Posted by: {movie.owner.username}</p>
              </div>

              <div className="movie-detail-poster-box">
                {movie.image ? (
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="movie-detail-poster"
                  />
                ) : (
                  <div className="movie-detail-no-image">Img Movie</div>
                )}
              </div>

              <div className="movie-detail-review-box">
                <p className="movie-detail-review-text">{movie.reviewContent}</p>

                {user && movie.owner && user._id === movie.owner._id && (
                  <div className="movie-detail-owner-actions">
                    <Link to={`/movies/${movieId}/edit`}>
                      <button className="movie-detail-action-btn">Edit</button>
                    </Link>

                    <button
                      onClick={handleDelete}
                      className="movie-detail-action-btn"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="movie-detail-like-row">
                <button
                  className="movie-detail-like-btn"
                  onClick={handleLike}
                >
                  {isLiked ? '❤️ Unlike' : '🤍 Like'} ({movie.likes?.length || 0})
                </button>
              </div>

              <div className="movie-detail-comments-box">
                <h2 className="movie-detail-comments-title">Comments</h2>

                <div className="movie-detail-comments-list">
                  {movie.comments.length > 0 ? (
                    movie.comments.map((comment) => (
                      <div key={comment._id} className="movie-detail-comment-card">
                        {editingCommentId === comment._id ? (
                          <>
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="movie-detail-comment-input"
                            />

                            {comment.author && (
                              <p className="movie-detail-comment-author">
                                By: {comment.author.username}
                              </p>
                            )}

                            <div className="comment-actions">
                              <button
                                onClick={() => handleUpdateComment(comment._id)}
                                className="movie-detail-comment-submit-btn"
                                disabled={!editText.trim()}
                              >
                                Save
                              </button>

                              <button
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditText('');
                                }}
                                className="movie-detail-delete-comment-btn"
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="movie-detail-comment-text">{comment.text}</p>

                            {comment.author && (
                              <p className="movie-detail-comment-author">
                                By: {comment.author.username}
                              </p>
                            )}

                            {user &&
                              comment.author &&
                              user._id === comment.author._id && (
                                <div className="comment-actions">
                                  <button
                                    onClick={() => {
                                      setEditingCommentId(comment._id);
                                      setEditText(comment.text);
                                    }}
                                    className="movie-detail-comment-submit-btn"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="movie-detail-delete-comment-btn"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>

                {user && (
                  <form
                    onSubmit={handleCommentSubmit}
                    className="movie-detail-comment-form"
                  >
                    <textarea
                      name="text"
                      placeholder="Write a comment..."
                      value={commentFormData.text}
                      onChange={handleCommentChange}
                      className="movie-detail-comment-input"
                    />

                    <button
                      type="submit"
                      className="movie-detail-comment-submit-btn"
                      disabled={!commentFormData.text.trim()}
                    >
                      Post
                    </button>
                  </form>
                )}
              </div>
            </div>

            <aside className="movie-side-column">
              <h3 className="movie-side-heading">More from this reviewer</h3>

              {ownerMovies.length > 0 ? (
                ownerMovies.map((item) => (
                  <Link
                    to={`/movies/${item._id}`}
                    key={item._id}
                    className="movie-side-card-link"
                  >

                  <div className="movie-side-card">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="movie-side-image"
                      />
                    ) : (
                      <div className="movie-side-no-image">No Image</div>
                    )}

                    <p className="movie-side-card-title">{item.title}</p>
                  </div>
                  </Link>
                ))
              ) : (
                  <div className="movie-side-card movie-side-empty">
                    No other reviews yet
                  </div>
              )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
};

export default MovieDetail;