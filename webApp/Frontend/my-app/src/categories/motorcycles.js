import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categories.css'; // Styles for the category

const Motorcycles = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/items');
               
                const motorcyclesItems = response.data.filter(item => item.category === 'Motorcycles');
                setItems(motorcyclesItems);
            } catch (error) {
                console.error('Error getting items:', error);
                alert('Failed to get items. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        getItems();
    }, []); // No token dependency

    if (loading) {
        return <p>Loading items...</p>;
    }

    return (
        <div className="motorcycles-page">
            <h1>Motorcycles</h1>
            <div className="items-container">
                {items.length === 0 ? (
                    <p>No items available in this category.</p>
                ) : (
                    items.map(item => (
                        <div key={item._id} className="item-card">
                            <h2>{item.name}</h2>
                            <img src={item.photo} alt={item.name} />
                            <p>Price: ${item.price}</p>
                            <p>Start Date: {new Date(item.startDate).toLocaleDateString()}</p>
                            <p>End Date: {new Date(item.endDate).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Motorcycles;
