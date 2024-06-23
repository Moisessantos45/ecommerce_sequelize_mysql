import request from "supertest";
import app from "../../../server";

describe("POST /api/1.0/products", () => {
  it("returns 200 ok when request is valid", async () => {
    const response = await request(app)
      .post("/api/1.0/products/register")
      .send({
        idUsuario: "fb2c8c52-39f8-48fb-be65-bf3e5ff97737",
        nameProduct: "product1",
        descripcion: "description1",
        price: 100,
        stock: 10,
        instrucciones: "instrucciones1",
        status: true,
        imgProduct: "image1",
      });

    expect(response.status).toBe(200);
    expect(response.status).not.toBe(400);
  });
});

// describe("GET /api/1.0/products", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).get("/api/1.0/products");

//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });

// describe("GET /api/1.0/products/:idProduct", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).get("/api/1.0/products/1");

//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });

// describe("GET /api/1.0/products/client", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).get("/api/1.0/products/client");

//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });

// describe("PUT /api/1.0/products/update/:idCliente", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).put("/api/1.0/products/update/1").send({
//       name: "product1",
//       price: 100,
//       description: "description1",
//       image: "image1",
//     });

//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });

// describe("PATCH /api/1.0/products/updateStatus/:idProduct", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).patch(
//       "/api/1.0/products/updateStatus/1"
//     );

//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });

// describe("DELETE /api/1.0/products/delete/:idProduct", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).delete("/api/1.0/products/delete/1/1");

//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });
