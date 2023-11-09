const express = require("express");
const cors = require('cors');
const app = express();
const Product=require("./models/product");
require('dotenv').config();


process.env.PORT;

// Configurar la conexión de mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


async function main() {
  await mongoose.connect(process.env.MONGO_CNN);
  console.log('Database connected');
}
main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());



app.post("/product",async(req,res)=>{
  const product=req.body;
  //validaciones
  const newProduct= new Product(product);
  try{
    await newProduct.save();
    res.status(201).json(newProduct);
  }catch(error){
    res.status(500).json({message:error});

  }

})

app.get("/product",async(req,res)=>{
  try{
  const products=await Product.find();
  res.status(200).json(products);
  }
  catch(error){
    res.status(500).json({message:error});
  }
})
// Iniciar el servidor en el puerto 3000
app.listen(process.env.PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${process.env.PORT}`);
});
