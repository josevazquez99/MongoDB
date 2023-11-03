const express = require("express");
const cors = require('cors');
const app = express();
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

// Iniciar el servidor en el puerto 3000
app.listen(process.env.PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${process.env.PORT}`);
});
