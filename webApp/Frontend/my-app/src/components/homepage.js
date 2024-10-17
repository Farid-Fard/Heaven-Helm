import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import './homepage.css';

function HomePage() {
    const navigate = useNavigate();

    let token = localStorage.getItem('token');
    let decodedToken = null;

    // Check if token exists and then decode it
    if (token) {
        try {
            decodedToken = jwtDecode(token);
            console.log(decodedToken);
        } catch (error) {
            console.error('Invalid token:', error);
            // Optionally navigate to login if token is invalid
            navigate('/login');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    const handleUserAccRedirect = () => {
        navigate('/user-account'); // Redirect to the user account page
    };

    return (
        <div className="home-page">
            <div className="navbar">
                <div className="navbar-content">
                    <div className="auth-buttons">
                        {token ? (
                            <>
                                <span 
                                    className="welcome-header" 
                                    onClick={handleUserAccRedirect} 
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    Welcome {decodedToken?.username || 'User'}
                                </span>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <h1>Welcome to Heaven-Helm</h1>
                                <button onClick={() => navigate('/login')}>Log In</button>
                                <button onClick={() => navigate('/register')}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="background-photo">
                <img
                    src={`${process.env.PUBLIC_URL}/H&H-Background.png`}
                    alt="Background"
                />
            </div>

            <div className="content">
                <p>Welcome to the best online auctioning platform!</p>
                <div className="category-buttons">
                    <button onClick={() => navigate('/motorcycles')}>Motorcycles</button>
                    <button onClick={() => navigate('/gears')}>Gears</button>
                    <button onClick={() => navigate('/spare-parts')}>Spare Parts</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
