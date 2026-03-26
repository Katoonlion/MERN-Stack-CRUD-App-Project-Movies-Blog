import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../services/authService';
import NavBar from '../../components/NavBar';
import UserContext from '../../contexts/UserContext';
import './AuthForm.css';

const SignUp = ({ setUser }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    });

    const { username, email, password, passwordConf } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
        const newUser = await signUp({
            username,
            email,
            password,
        });

        setUser(newUser);
        navigate('/');
        } catch (err) {
        setMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(username && email && password && password === passwordConf);
    };

    return (
        <>
        <NavBar />

        <main className="auth-page">
            <section className="auth-container">
            <h1 className="auth-title">Sign-up Form</h1>

            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange}
                    className="auth-input"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password Input"
                    value={password}
                    onChange={handleChange}
                    className="auth-input"
                />

                <input
                    type="password"
                    name="passwordConf"
                    placeholder="Confirm Password"
                    value={passwordConf}
                    onChange={handleChange}
                    className="auth-input"
                />

                <button
                    type="submit"
                    disabled={isFormInvalid()}
                    className="auth-submit-btn"
                >
                    Submit  
                </button>
            </form>

            {message && <p className="auth-message">{message}</p>}

            <p className="auth-switch-text">
                Already have an account? <Link to="/sign-in">Sign in</Link>
            </p>
            </section>
        </main>
        </>
    );
};

export default SignUp;