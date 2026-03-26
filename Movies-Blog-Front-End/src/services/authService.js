const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Sign up failed');
    }

    localStorage.setItem('token', data.token);
    return getUser();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || 'Sign in failed');
    }

    localStorage.setItem('token', data.token);
    return getUser();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

const getUser = () => {
  const token = getToken();
  if (!token) return null;

  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload));

  return decodedPayload.payload;
};

const signOut = () => {
  localStorage.removeItem('token');
};

export { signUp, signIn, getToken, getUser, signOut };