import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../../services/movieService';
import NavBar from '../../components/NavBar';
import './MovieForm.css';

const MovieForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    rating: '',
    image: '',
    reviewContent: '',
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log('submit clicked');
    console.log(formData);

    try {
      const newMovie = await create(formData);
      console.log('created movie:', newMovie);
      navigate('/');
    } catch (error) {
      console.log('create movie error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <NavBar />

      <main className="movie-form-page">
        <section className="movie-form-container">
          <h1 className="movie-form-title">Create New Review</h1>

          <form onSubmit={handleSubmit} className="movie-form">
            <input
              type="text"
              name="title"
              placeholder="Title input"
              value={formData.title}
              onChange={handleChange}
              className="movie-form-input"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="movie-form-input"
            />

            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="movie-form-input"
              min="1"
              max="5"
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
              placeholder="Review Content"
              value={formData.reviewContent}
              onChange={handleChange}
              className="movie-form-textarea"
            />

            <div className="movie-form-btn-row">
              <button 
                type="submit" 
                className="movie-form-submit-btn"
              >
                Submit
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

export default MovieForm;