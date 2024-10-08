import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './userAcc.css'; 

function UserAcc() {
    const navigate = useNavigate(); 
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="user-account">
            <div className="navbar">
                <span>Welcome to Your Account</span>
            </div>
            <div className="content">
                <div className="items-box">
                    <h2>My Items</h2>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div className="item-preview" key={index}>
                                <h3>{item.productName}</h3>
                                <p>{item.productDescription}</p>
                                <p>Price: ${item.initialPrice.toFixed(2)}</p>
                                {item.photo && <img src={item.photo} alt={item.productName} />}
                                <p>Category: {item.category}</p>
                            </div>
                        ))
                    ) : (
                        <p>No items found.</p>
                    )}
                </div>
                <div className="actions-box">
                    <button onClick={() => navigate('/add-auction')}>List an Item</button>
                    <button onClick={() => navigate('/')}>Continue Browsing</button>
                </div>
            </div>
        </div>
    );
}

export default UserAcc;
