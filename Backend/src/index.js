// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { initializeSocket } from "./socket.server.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error; // Stop the application and propagate the error for further handling
    });

    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port : ${process.env.PORT}`);
    });
    initializeSocket(server);
  })
  .catch((err) => {
    console.log("DB Connection Failed !!!", err);
  });
