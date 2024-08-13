import foodAndNutritionRecord from "../model/foodModel.js"
import express from "express"
import {createFood,getFood,getFoodById,updateFoodById,deleteFoodById} from "../controller/foodController.js"
const router = express.Router();

router.post('/',createFood);

router.get('/',getFood);

router.get('/:id',getFoodById);

router.put('/:id',updateFoodById);

router.delete('/:id',deleteFoodById);
export default router;