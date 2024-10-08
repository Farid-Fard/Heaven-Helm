import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyDatePicker from './myDatePicker.js';
import './AddAuctionModal.css';

const AddAuctionModal = ({ onClose }) => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllItems = async () => {
    try {
      setLoading(true);
      let res = await axios.get('http://localhost:4000/items/');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert('Failed to fetch items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const createItem = async (formData) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:4000/items/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Auction added successfully!');
      getAllItems();
    } catch (error) {
      console.error('Error creating auction:', error);
      alert('Failed to create auction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, formData) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/items/update/${itemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Auction updated successfully!');
      getAllItems();
    } catch (error) {
      console.error('Error updating auction:', error);
      alert('Failed to update auction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/items/delete/${itemId}`);
      alert('Auction deleted successfully!');
      getAllItems();
    } catch (error) {
      console.error('Error deleting auction:', error);
      alert('Failed to delete auction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      alert('Please select a category.');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('price', price); 
    formData.append('name', name);    
    formData.append('photo', photo);
    formData.append('startDate', startDate ? startDate.toISOString() : '');
    formData.append('endDate', endDate ? endDate.toISOString() : '');

    try {
      if (isEditing) {
        await updateItem(currentItemId, formData);
      } else {
        await createItem(formData);
      }
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting auction:', error);
      alert('Failed to submit auction. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setCategory(item.category);
    setPrice(item.price);  
    setName(item.name);    
    setStartDate(new Date(item.startDate));
    setEndDate(new Date(item.endDate));
    setCurrentItemId(item._id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setCategory('');
    setPrice('');
    setName('');
    setPhoto(null);
    setStartDate(null);
    setEndDate(null);
    setIsEditing(false);
    setCurrentItemId(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isEditing ? 'Edit Auction' : 'Add Auction'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select a category</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Gears">Gears</option>
              <option value="Spare Parts">Spare Parts</option>
            </select>
          </div>
          <div>
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Upload Photo:</label>
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required={!isEditing} />
          </div>
          <div>
            <label>Auction Start Date:</label>
            <MyDatePicker 
              selectedDate={startDate}
              onDateChange={setStartDate}
              placeholder="Select Start Date"
            />
          </div>
          <div>
            <label>Auction End Date:</label>
            <MyDatePicker 
              selectedDate={endDate}
              onDateChange={setEndDate}
              placeholder="Select End Date"
            />
          </div>
          <button type="submit" disabled={loading}>
            {isEditing ? 'Update' : 'Submit'}
          </button>
          {loading && <p>Loading...</p>}
        </form>
        <h3>Existing Auctions</h3>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name} - {item.price}$
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddAuctionModal;
