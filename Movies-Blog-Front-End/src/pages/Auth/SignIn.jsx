import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../../services/authService';
import NavBar from '../../components/NavBar';
import UserContext from '../../contexts/UserContext';
import './AuthForm.css';

const SignIn = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
        const user = await signIn(formData);
        setUser(user);
        navigate('/');
        } catch (err) {
        setMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(username && password);
    };

 return (
    <>
        <NavBar />

        <main className="auth-page">
            <section className="auth-container">
            <h1 className="auth-title">Sign-in Form</h1>

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
                Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
            </p>
            </section>
        </main>
        </>
    );
};


export default SignIn;