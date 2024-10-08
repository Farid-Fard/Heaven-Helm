import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categories.css'; 

function Motorcycles() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchMotorcycleItems = async () => {
            try {
                const response = await axios.get('/api/motorcycles'); //to be edited 
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching motorcycle items:', error);
            }
        };

        fetchMotorcycleItems();
    }, []);

    return (
        <div>
            <h2>Motorcycles</h2>
            <div className="item-cards">
                {items.map(item => (
                    <div className="item-card" key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <img src={item.photo} alt={item.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Motorcycles;
