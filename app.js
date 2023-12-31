const express = require("express");
const cors = require('cors');
const app = express();
const Athelete=require("./models/athelete");
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
// Datos de ejemplo (lista de usuarios)
const users = [
  { id: 1, name: "Usuario 1" },
  { id: 2, name: "Usuario 2" },
  { id: 3, name: "Usuario 3" },
];

// Ruta para obtener la lista de usuarios
app.get("/users", (req, res) => {
  res.json(users);


});
app.post("/athelete",async(req,res)=>{
  const athelete=req.body;
  //validaciones
  const newAthelete= new Athelete(athelete);
  try{
    await newAthelete.save();
    res.status(201).json(newAthelete);
  }catch(error){
    res.status(500).json({message:error});

  }

})

app.get("/athelete",async(req,res)=>{
  try{
  const atheletes=await Athelete.find();
  res.status(200).json(atheletes);
  }
  catch(error){
    res.status(500).json({message:error});
  }
})
// Iniciar el servidor en el puerto 3000
app.listen(process.env.PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${process.env.PORT}`);
});
