import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import UserAcc from './userAcc';
import Login from './components/login';
import Register from './components/registerPage';
import Motorcycles from './categories/motorcycles';
import Gears from './categories/gears';
import SpareParts from './categories/spareParts';
import AddAuctionModal from './components/AddAuctionModal';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-account" element={<UserAcc />} />
                <Route path="/motorcycles" element={<Motorcycles />} />
                <Route path="/gears" element={<Gears />} />
                <Route path="/spare-parts" element={<SpareParts />} />
                
                <Route 
                  path="/add-auction" 
                  element={<AddAuctionModal onClose={() => window.history.back()} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;