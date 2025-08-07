const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors());
const {initializeDatabase} = require("./db/db.connect");
const Hotel = require("./models/hotel.models");
app.use(express.json());
initializeDatabase();

async function deleteHotelById(hotelId){
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
        return null;
    }
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return deletedHotel;
    } catch(error){
        throw error
    }
}

app.delete("/hotels/:hotelId", async (req, res) => {
    try{
        const deletedHotel = await deleteHotelById(req.params.hotelId);
        if(deletedHotel){
            res.status(200).json({message: "Hotel deleted successfully."});
        } else{
            res.status(404).json({error: "Hotel not found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to delete hotel."});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});