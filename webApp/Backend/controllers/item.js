const Item = require('../models/item'); 


exports.createItem = async (req, res) => {
    const { category, price, name, productDescription, build, photo, startDate, endDate } = req.body;

    
    if (!category || !price || !name || !productDescription || !build || !photo || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        
        const newItem = new Item({
            category,
            price,
            name,
            productDescription,
            build,
            photo, 
            startDate,
            endDate,
        });

       
        await newItem.save();
        return res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        return res.status(500).json({ message: 'Failed to create item. Please try again.' });
    }
};


exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { category, price, name, productDescription, build, photo, startDate, endDate } = req.body;

    if (!category || !price || !name || !productDescription || !build || !photo || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      
        const updatedItem = await Item.findByIdAndUpdate(id, {
            category,
            price,
            name,
            productDescription,
            build,
            photo,
            startDate,
            endDate,
        }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ message: 'Failed to update item. Please try again.' });
    }
};


exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({});
        return res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ message: 'Failed to fetch items. Please try again.' });
    }
};


exports.deleteItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        return res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ message: 'Failed to delete item. Please try again.' });
    }
};
