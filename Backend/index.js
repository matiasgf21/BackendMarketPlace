import express from "express";
const app = express();
const PORT = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

let productos = [{}];

// GET - lista de productos
app.get("/productos", (req, res) => {
  res.status(200).json(productos);
});

// GET - detalle de un producto
app.get("/productos/:id", (req, res) => {
  const producto = productos.find((p) => p.id == req.params.id);
  if (!producto)
    return res.status(404).json({ message: "Producto no encontrado" });
  res.json(producto);
});

// POST - crear un producto
app.post("/productos", (req, res) => {
  const nuevo = req.body;
  if (!nuevo.id || !nuevo.nombre || !nuevo.precio) {
    return res.status(400).json({ message: "Faltan datos del producto" });
  }
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// DELETE - eliminar un producto
app.delete("/productos/:id", (req, res) => {
  const index = productos.findIndex((p) => p.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Producto no encontrado" });
  productos.splice(index, 1);
  res.sendStatus(204);
});

module.exports = app;
