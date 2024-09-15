// src/components/FruitAi.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const handleClick = (buttonText) => {
        console.log(`Button clicked: ${buttonText}`);
        // Implement navigation or other actions here
    };
    const navigate=useNavigate();

    return (
        <div className='home-container'>
        <div className="container">
            <div className="title">Fruit.Ai</div>
            <div className="subtitle">"Be Healthy!"</div>
            <div className="button-container">
                <button className="button chat" onClick={() => navigate('/chat')}>Chat</button>
                <button className="button translate" onClick={() => navigate('/translate')}>
                    Translate
                </button>
                <button className="button faqs" onClick={() => navigate('/faq')}>FAQs</button>
                <button className="button about" onClick={() => navigate('/about')}>About</button>
            </div>
            <div className="indicator">
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
        </div>
    );
};

export default Home;
