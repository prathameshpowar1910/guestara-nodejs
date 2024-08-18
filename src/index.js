import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import { app } from './app.js'

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MONGODB connection error !! ", error);
  });
