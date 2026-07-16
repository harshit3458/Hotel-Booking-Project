import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getHotels, registerHotel } from "../controllers/hotelController.js";

const hotelRouter=express.Router();

hotelRouter.post('/',protect,registerHotel);
hotelRouter.get('/get-hotels',getHotels);


export default hotelRouter;