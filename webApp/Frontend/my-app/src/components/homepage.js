import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './homepage.css'; 

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <div className="navbar">
                <div className="navbar-content">
                    <h1>Welcome to Heaven-Helm</h1>
                    <div className="auth-buttons">
                        <button onClick={() => navigate('/login')}>Log In</button>
                        <button onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
                </div>
            </div>

            <div className="background-photo"><img src={`${process.env.PUBLIC_URL}/H&H-Background.png`} alt="Background" />
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
