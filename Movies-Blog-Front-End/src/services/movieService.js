import { getToken } from './authService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/movies`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const show = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}`);
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const create = async (movieFormData) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieFormData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to create movie');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const update = async (movieId, movieFormData) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieFormData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to update movie');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const toggleLike = async (movieId) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${movieId}/like`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to toggle like');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteMovie = async (movieId) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to delete movie');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createComment = async (movieId, commentFormData) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${movieId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentFormData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to create comment');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateComment = async (movieId, commentId, formData) => {
  const res = await fetch(`${BASE_URL}/${movieId}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};

const deleteComment = async (movieId, commentId) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/${movieId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Failed to delete comment');
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  index,
  show,
  create,
  update,
  toggleLike,
  deleteMovie,
  createComment,
  updateComment,
  deleteComment,
};