import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './userAcc.css'; 

function UserAcc() {
    const navigate = useNavigate(); 
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/items', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
                setError("Failed to fetch items. Please try again later."); 
            }
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return; 

        try {
            
            await axios.delete(`http://localhost:4000/items/delete/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            
            setItems(items.filter(item => item._id !== id)); 
        } catch (error) {
            console.error("Error deleting item:", error);
            setError("Failed to delete item. Please try again later."); 
        }
    };

    // const handleEdit = (id) => {
    //     // Navigate to the edit page, replace '/edit-auction' with your actual edit path
    //     navigate(`/edit-auction/${id}`);
    // };

    return (
        <div className="user-account">
            <div className="navbar">
                <span>Welcome to Your Account</span>
            </div>
            <div className="content">
                <div className="items-box">
                    <h2>My Items</h2>
                    {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div className="item-preview" key={item._id}>
                                <h3>{item.name}</h3> {/* Updated from productName to name */}
                                <p>{item.productDescription}</p>
                                <p>Price: ${parseFloat(item.price).toFixed(2)}</p> {/* Updated from initialPrice to price */}
                                {item.photo && <img src={`data:image/jpeg;base64,${item.photo}`} alt={item.name} />} {/* Handle base64 string */}
                                <p>Category: {item.category}</p>
                                <div className="item-actions">
                                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
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
