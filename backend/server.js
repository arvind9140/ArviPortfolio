import { app} from "./app.js"
import dotenv from "dotenv"
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";
import express from 'express'
import path from 'path'
import { dirname } from 'path'; 
// const  __dirname = path.resolve(dirname);
// require('dotenv').config({path:"./config/.env"})
dotenv.config({path:"./backend/config/.env"});

connectDatabase();


cloudinary.v2.config({
  cloud_name: 'dfq0ge0zt', 
  api_key: '214435175726284', 
  api_secret: 'PDhOv_RVTqE_G4txGp6W_ubLwzw' 
});

process.env.PWD = process.cwd();

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join("frontend/build")));
  app.get('*', function (req, res) {
    const index = path.join( 'frontend', 'build', 'index.html');
    res.sendFile('index.html', { root: path.join(__dirname, '../build') });
  });
}

app.listen(process.env.PORT, ()=>{
  console.log(`Server is running on port: ${process.env.PORT}`)
})