const mongoose = require("mongoose");
const Item = require("../models/item");

const getAllItems = async (req, res) => {
  try {
    let items = await Item.find();
    return res.status(200).send(items);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Issue", status: false });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, price, build, photo, category, startDate, endDate } = req.body;

  
    if (!name || !price || !category || !startDate || !endDate) {
      return res.status(400).json({ msg: "Missing required fields", status: false });
    }

    
    let newItem = {
      name,
      price,
      build,
      photo,
      category,
      startDate: new Date(startDate), 
      endDate: new Date(endDate)
    };

    let item = await Item.create(newItem);
    return res.send({ msg: "Created successfully", status: true, item });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Issue", status: false });
  }
};

const deleteItem = async (req, res) => {
  try {
    let itemId = req.params.itemId;
    let itemFound = await Item.findById(itemId);
    
    if (!itemFound) {
      return res.send({ msg: "Item not found" });
    }

    await Item.findByIdAndDelete(itemId);
    return res.send({ msg: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Issue", status: false });
  }
};

const updateItem = async (req, res) => {
  try {
    let itemId = req.params.itemId;
    const { name, price, build, photo, category, startDate, endDate } = req.body;

    let itemFound = await Item.findById(itemId);
    if (!itemFound) {
      return res.status(404).send({ msg: "Item not found", status: false });
    }

    if (!name || !price || !category || !startDate || !endDate) {
      return res.status(400).json({ msg: "Missing required fields", status: false });
    }

    let updatedItem = await Item.findByIdAndUpdate(itemId, {
      name,
      price,
      build,
      photo,
      category,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }, { new: true });

    return res.status(200).send({ msg: "Updated Successfully", status: true, updatedItem });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Issue", status: false });
  }
};

module.exports = { getAllItems, createItem, deleteItem, updateItem };
