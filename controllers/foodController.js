import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item 
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const fooditem = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await fooditem.save();
        res.json({success: true, message: 'Food Added Successfully!'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Food Not Added!'});
    }
}

//All food list
const listFood = async (req,res) => {
try {
    const foods = await foodModel.find({});
    res.json({success: true,message: "data is here", data: foods});
} catch (error) {
    console.log(error);
    res.json({success: false, message: 'Error while fetching foods'});
}
}

//Remove food item
const removeFood = async (req,res) => {
    console.log(req);
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success: true, message: 'Food deleted successfully'});
} catch (error) {
    console.log(error)
    res.json({success: false, message: 'Food not deleted'});
}
}
export {addFood, listFood, removeFood}