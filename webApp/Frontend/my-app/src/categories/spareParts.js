import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categories.css';

function SpareParts() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchSparePartItems = async () => {
            try {
                const response = await axios.get('/api/spare-parts'); // to be edited 
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching spare part items:', error);
            }
        };

        fetchSparePartItems();
    }, []);

    return (
        <div>
            <h2>Spare Parts</h2>
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

export default SpareParts;
