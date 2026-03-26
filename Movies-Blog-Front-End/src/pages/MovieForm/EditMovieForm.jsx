import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { show, update } from '../../services/movieService';
import NavBar from '../../components/NavBar';
import './MovieForm.css';

const EditMovieForm = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    rating: '',
    image: '',
    reviewContent: '',
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await show(movieId);

        setFormData({
          title: movieData.title || '',
          category: movieData.category || '',
          rating: movieData.rating || '',
          image: movieData.image || '',
          reviewContent: movieData.reviewContent || '',
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    console.log('formData:', formData);

    try {
      const updatedMovie = await update(movieId, formData);
      console.log('updated movie:', updatedMovie);
      navigate(`/movies/${movieId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <>
        <NavBar  />  
            <main className="movie-form-page">
                <section className="movie-form-container">

                <h1 className="movie-form-title">Edit Review</h1>

                    <form onSubmit={handleSubmit} className="movie-form">

                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="movie-form-input"
                        />

                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="movie-form-input"
                        />

                        <input
                          type="number"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          className="movie-form-input"
                        />

                        <input
                          type="text"
                          name="image"
                          placeholder="Image URL"
                          value={formData.image}
                          onChange={handleChange}
                          className="movie-form-input"
                        />

                        {formData.image && (
                          <img
                            src={formData.image}
                            alt={formData.title}
                            className="movie-form-preview"
                          />
                        )}

                        <textarea
                          name="reviewContent"
                          value={formData.reviewContent}
                          onChange={handleChange}
                          className="movie-form-textarea"
                        />

                        <div className="movie-form-btn-row">
                          <button 
                            type="submit" 
                            className="movie-form-submit-btn"
                          >
                            Update
                          </button>

                          <button
                            type="button"
                            onClick={handleCancel}
                            className="movie-form-cancel-btn"
                          >
                            Cancel
                          </button>
                        </div>

                    </form>
                </section>
            </main>
    </>
  );
};

export default EditMovieForm;