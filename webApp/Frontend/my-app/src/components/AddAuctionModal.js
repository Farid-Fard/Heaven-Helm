import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MyDatePicker from './myDatePicker.js';
import './AddAuctionModal.css';

const AddAuctionModal = ({ onClose }) => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [photo, setPhoto] = useState(null); // Store the uploaded photo as a base64 string
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [build, setBuild] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getAllItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/items', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert('Failed to fetch items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; 
        setPhoto(base64String); 
        console.log('Current photo state after setting:', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setCategory('');
    setPrice('');
    setName('');
    setProductDescription('');
    setPhoto(null);
    setStartDate(null);
    setEndDate(null);
    setBuild('');
    setIsEditing(false);
    setCurrentItemId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!category) {
      alert('Category is required.');
      return;
    }
    if (!price) {
      alert('Price is required.');
      return;
    }
    if (!name) {
      alert('Name is required.');
      return;
    }
    if (photo === null) {
      alert('Photo is required.');
      return;
    }

    const formData = {
      category,
      price,
      name,
      productDescription,
      build,
      photo, 
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };

    console.log('Form data before submission:', formData);

    try {
      if (isEditing) {
        await updateItem(currentItemId, formData);
      } else {
        await createItem(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting auction:', error.response ? error.response.data : error);
      alert('Failed to submit auction. Please try again.');
    } finally {
      onClose(); 
    }
  };


  const createItem = async (formData) => {
    try {
      await axios.post('http://localhost:4000/items/create', formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      getAllItems();
    } catch (error) {
      console.error('Error creating item:', error.response ? error.response.data : error);
      alert('Failed to create item. Please try again.');
    }
  };

  const updateItem = async (id, formData) => {
    try {
      await axios.put(`http://localhost:4000/items/update/${id}`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      getAllItems(); 
    } catch (error) {
      console.error('Error updating item:', error.response ? error.response.data : error);
      alert('Failed to update item. Please try again.');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Gears">Gears</option>
            <option value="Motorcycles">Motorcycles</option>
            <option value="Spare Parts">Spare Parts</option>
          </select>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Auctioner contact and product description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Build:</label>
          <input
            type="number"
            value={build}
            onChange={(e) => setBuild(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            required
          />
        </div>
        <div>
          <MyDatePicker
            selectedDate={startDate}
            onDateChange={setStartDate}
            placeholderText="Select Start Date"
          />
          <MyDatePicker
            selectedDate={endDate}
            onDateChange={setEndDate}
            placeholderText="Select End Date"
          />
        </div>
        <button type="submit" disabled={loading}>
          {isEditing ? 'Update' : 'Submit'}
        </button>
        {loading && <p>Loading...</p>}
      </form>

      {/* Displaying existing items */}
      <div>
        <h2>Existing Auctions:</h2>
        <ul>
          {items.map(item => (
            <li key={item._id}>
              {item.name} - {item.price} ({item.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddAuctionModal;
