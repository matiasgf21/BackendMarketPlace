// test/test.spec.js
import request from "supertest";
import app from "../index.js";

describe("Pruebas API REST - Marketplace de Tecnología", () => {
  test("GET /productos → 200 y retorna un arreglo", async () => {
    const res = await request(app).get("/productos");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("GET /productos/999 → 404 si el producto no existe", async () => {
    const res = await request(app).get("/productos/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Producto no encontrado");
  });

  test("POST /productos → 201 al crear un producto válido", async () => {
    const nuevoProducto = {
      nombre: "Smartphone Samsung S25",
      precio: 899,
    };
    const res = await request(app).post("/productos").send(nuevoProducto);
    expect(res.statusCode).toBe(201);

    // Compara nombre normalmente
    expect(res.body.nombre).toBe(nuevoProducto.nombre);

    // Convierte precio a número antes de comparar
    expect(Number(res.body.precio)).toBe(nuevoProducto.precio);
  });

  test("POST /productos → 400 si faltan datos", async () => {
    const res = await request(app)
      .post("/productos")
      .send({ nombre: "Mouse Logitech" });
    expect(res.statusCode).toBe(400);
  });

  test("DELETE /productos/1 → 204 si elimina un producto existente", async () => {
    const res = await request(app).delete("/productos/1");
    expect(res.statusCode).toBe(204);
  });

  test("DELETE /productos/999 → 404 si no existe el producto", async () => {
    const res = await request(app).delete("/productos/999");
    expect(res.statusCode).toBe(404);
  });
});
