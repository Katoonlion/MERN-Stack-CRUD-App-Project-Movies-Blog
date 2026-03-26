import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { getUser, signOut } from './services/authService';

import UserContext from './contexts/UserContext';

import Home from './pages/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import MovieForm from './pages/MovieForm/MovieForm';
import EditMovieForm from './pages/MovieForm/EditMovieForm';
import MyReviews from './pages/MyReviews/MyReviews';
import MyFavorites from './pages/MyFavorites/MyFavorites';
import SearchResults from './pages/SearchResults/SearchResults';


const App = () => {
    const [user, setUser] = useState(getUser());

    const handleSignOut = () => {
        signOut();
        setUser(null);
    };

  return (

    <div className="app-shell">

      <UserContext.Provider value={{ user, setUser, handleSignOut }}>
          <Routes>     
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/my-favorites" element={<MyFavorites />} />
          <Route path="/movies/new" element={<MovieForm />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/movies/:movieId/edit" element={<EditMovieForm />} />
          </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;