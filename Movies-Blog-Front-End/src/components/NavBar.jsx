import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';

const NavBar = () => {
    const navigate = useNavigate();
    const { user, handleSignOut } = useContext(UserContext);
    const [searchInput, setSearchInput] = useState('');

    const onSignOut = () => {
        handleSignOut();
        navigate('/');
    };

    const handleSearchSubmit = (evt) => {
        evt.preventDefault();

        const trimmedSearch = searchInput.trim();

        if (!trimmedSearch) {
        navigate('/search');
        return;
        }

        navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    };
    
    return (
        <header className="navbar">

        <div className="logo">
            <Link to="/">🍿 Popcorn Picks</Link>
        </div>

        <div className="search">
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(evt) => setSearchInput(evt.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-btn">🔍</button>
            </form>
        </div>

        <div className="auth">
            {user ? (
            <>
                <span className="username">Hi {user.username}</span>
                <button onClick={onSignOut}>Sign-out</button>
            </>
            ) : (
            <>
                <Link to="/sign-in">Sign-in</Link>
                <Link to="/sign-up">Sign-up</Link>
            </>
            )}
        </div>

        <nav className="menu">
            <Link to="/">Home</Link>
            <Link to={user ? "/my-reviews" : "/sign-in"}>My Reviews</Link>
            <Link to={user ? "/my-favorites" : "/sign-in"}>My Favorite</Link>
            <Link to={user ? "/movies/new" : "/sign-in"}>Create Review</Link>
        </nav>

        </header>
  );
};

export default NavBar;