import mongoose from "mongoose";

const foodAndNutritionSchema = new mongoose.Schema({

    foodName : String,
    foodGroup : String,
    description : String,
    nutritionalInformation : {
        calories:Number,
        proteins:Number,
        fats:Number,
        carbohydrates:Number,
        sodium:Number,
        cholestrol:Number,
    },
    servingSize:Number,
    allergens:[String],
    ingredients:[String],
    preparationMethods:[String],
    certifications:String,
    countryOrigin:String,
    Brand:String,
    DietaryRestritctions:[String]
})

const foodAndNutritionRecord = mongoose.model('foodAndNutritionRecord',foodAndNutritionSchema);

export default foodAndNutritionRecord;