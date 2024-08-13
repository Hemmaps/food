import foodAndNutritionRecord from "../model/foodModel.js"
//create or add food 
export const createFood = async(req,res)=>{

    try {
        const data = await foodAndNutritionRecord.create(req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({"message":"Server error"});
    }
}
// read all food present
export const getFood = async(req,res)=>{
    try {
        const data = await foodAndNutritionRecord.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({"message":"Bad Request"});
    }
}

//read food by id

export const getFoodById = async(req,res)=>{
    try {
        const data = await foodAndNutritionRecord.findById({_id:req.params.id})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({"message":"Bad Request"});
    }
}

//update food by id
export const updateFoodById = async(req,res)=>{
    try {
        const data = await foodAndNutritionRecord.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({"message":"not found"})
        }
        
    } catch (error) {
        res.status(500).json({"message":"Bad Request"});
    }
}

//delete food by id

export const deleteFoodById = async(req,res)=>{
    try {
        const data = await foodAndNutritionRecord.findByIdAndDelete(req.params.id)
        if(data){
            res.status(200).json({"message":"Deleted sucessfully"})
        }else{
            res.status(404).json({"message":"not found"})
        }
        
    } catch (error) {
        res.status(500).json({"message":"Bad Request"});
    }
}