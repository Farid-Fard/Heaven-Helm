import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categories.css'; 

function Gears() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchGearItems = async () => {
            try {
                const response = await axios.get('/api/gears'); // to be edited 
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching gear items:', error);
            }
        };

        fetchGearItems();
    }, []);

    return (
        <div>
            <h2>Gears</h2>
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

export default Gears;
