const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`connect with DB: ${conn.connection.host}`);
    console.log(`connect with DB.....`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
