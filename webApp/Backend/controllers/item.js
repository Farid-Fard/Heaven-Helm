const mongoose = require("mongoose")
const Item = require("../models/item")

const getAllItems = async(req, res)=>{
    try {
        let items = await Item.find()
        return res.status(200).send(items)
    } catch (error) {
    console.log(error)
        return res.status(500).send({msg:"Internal Server Issue", status:false})
    }
}

const createItem = async(req, res)=>{

    try {
        const { productName, initialPrice, build, photo } = req.body;

        if (!productName || !initialPrice || !build) {
            return res.status(400).json({ msg: "Missing required fields", status: false });
          }
      
        let newItem = req.body;
       let item =  await Item.create(newItem);
       return res.send({msg:"created succesfully", status:true, item})
    } catch (error) {
        return res.status(500).send({msg:"Internal Server Issue", status:false})
    }
}

const deleteItem = async(req, res)=>{
    try {
       let itemId= req.params.itemId
       let itemFound = await Item.findById(itemId)
       if (!itemFound){
        return res.send({msg:"task not found"})
       }
       await Item.findByIdAndDelete(itemId)
       return res.send({msg:"Deleted Successfully"})
    } catch (error) {
        return res.status(500).send({msg:"Internal Server Issue", status:false})
    }
};


const updateItem = async(req, res)=>{
    try {
        let itemId = req.params.itemId;
        let { productName, initialPrice, build, photo } = req.body;

        let itemFound = await Item.findById(itemId);
        if (!itemFound) {
            return res.status(404).send({ msg: "Item not found", status: false });
        }

        if (!productName || !initialPrice || !build) {
            return res.status(400).json({ msg: "Missing required fields", status: false });
        }

        let updatedItem = await Item.findByIdAndUpdate(itemId, {
            productName,
            initialPrice,
            build,
            photo 
        }, { new: true });

        return res.status(200).send({ msg: "Updated Successfully", status: true, updatedItem });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Internal Server Issue", status: false });
    }
};


module.exports = {getAllItems, createItem, deleteItem, updateItem}