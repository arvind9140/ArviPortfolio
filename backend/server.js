import { app} from "./app.js"
import dotenv from "dotenv"
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const  __dirname = path.resolve(dirname);
// require('dotenv').config({path:"./config/.env"})
dotenv.config({path:"./backend/config/.env"});

connectDatabase();


cloudinary.v2.config({
  cloud_name: 'dfq0ge0zt', 
  api_key: '214435175726284', 
  api_secret: 'PDhOv_RVTqE_G4txGp6W_ubLwzw' 
});



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.listen(process.env.PORT, ()=>{
  console.log(`Server is running on port: ${process.env.PORT}`)
})